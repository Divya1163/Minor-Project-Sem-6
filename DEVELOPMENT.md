# Development Guide - Thermal Comfort Predictor

## Project Overview

This is a full-stack thermal comfort prediction application built with Next.js, showcasing modern web development practices including server-side rendering, client-side state management, responsive design, and data visualization.

## Architecture

### Frontend Structure

```
App Structure:
├── Layout (Root)
│   ├── Navigation (Header)
│   ├── Page/Route Content
│   └── Footer
└── Sidebar/Context (if needed)
```

### Key Components

#### 1. **Navigation** (`/components/navigation.tsx`)
- Sticky header with logo and navigation links
- Active link detection based on current route
- Responsive design with Thermometer icon branding

#### 2. **Prediction Form** (`/components/prediction-form.tsx`)
- Interactive form for thermal parameter input
- Real-time value display and live updates
- Calculation of Thermal Humidity Index (THI)
- ML model prediction simulation
- Confidence score visualization
- Sample scenario quick-load functionality

#### 3. **Analytics Dashboard** (`/components/analytics-dashboard.tsx`)
- Multiple chart types using Recharts:
  - Bar charts (Temperature vs Comfort, Feature Importance)
  - Line charts (Humidity Distribution)
  - Pie charts (Comfort Distribution)
- Key metrics cards
- Model performance comparison
- Key insights section

#### 4. **Footer** (`/components/footer.tsx`)
- Company branding and description
- Quick navigation links
- Social media connections
- Legal links (Privacy, Terms)

#### 5. **Sample Scenarios** (`/components/sample-scenarios.tsx`)
- Quick-load predefined scenarios
- Visual comfort indicators
- Easy parameter exploration

### Pages

#### Home Page (`/app/page.tsx`)
- Hero section with feature overview
- 2-column layout:
  - Left: Interactive prediction form
  - Right: Information panels
- How it works guide
- Parameter explanations
- Model information

#### Analytics Page (`/app/analytics/page.tsx`)
- Full-page analytics dashboard
- Header with feature overview
- Responsive grid layout
- Multiple visualization types

## Styling System

### Design Tokens (`/app/globals.css`)

The application uses oklch color space for better perceptual uniformity:

```
Color Token Map:
├── Background & Foreground
│   ├── --background: oklch(0.12 0 0) - Very dark gray
│   └── --foreground: oklch(0.95 0 0) - Near white
├── Interactive Elements
│   ├── --primary: oklch(0.49 0.24 264.376) - Blue
│   └── --accent: oklch(0.69 0.17 162.48) - Cyan
├── Semantic Colors
│   ├── --secondary: oklch(0.22 0 0) - Dark gray
│   ├── --muted: oklch(0.22 0 0) - Muted state
│   └── --destructive: oklch(0.62 0.26 27.325) - Red
└── Charts
    ├── --chart-1 through --chart-5: Various accent colors
```

### Tailwind Configuration

- Uses Tailwind CSS v4 with `@theme inline` configuration
- Custom color and border radius tokens
- Responsive design utilities (mobile-first approach)
- Gap and spacing classes for consistent layouts

## State Management

### Client-Side State
- React hooks (`useState`) for form state and predictions
- No external state management needed for current features
- Component-level prop drilling for simple data flow

### Future Considerations
- Could use Context API for shared state (user preferences, settings)
- Could use SWR for API data fetching and caching
- Could use Zustand or Redux if complexity increases

## Data Flow

### Prediction Flow
```
1. User Input (Form fields or Sample Scenarios)
   ↓
2. Form State Update (handleChange)
   ↓
3. Form Submission (handleSubmit)
   ↓
4. Calculation (THI formula)
   ↓
5. ML Prediction (simulated)
   ↓
6. Result Display (setResult)
   ↓
7. UI Update (confidence bar, status badge)
```

### Analytics Data Flow
```
1. Static Data (hardcoded sample data)
   ↓
2. Recharts Processing
   ↓
3. Chart Rendering (responsive containers)
   ↓
4. User Interaction (tooltips, hover effects)
```

## Adding Features

### Adding a New Input Parameter
1. Add field to `formData` state in `PredictionForm`
2. Add input component in the form grid
3. Add to sample scenarios in `SampleScenarios`
4. Update prediction logic in `handleSubmit`
5. Update documentation in home page info cards

### Adding a New Chart
1. Create data in `AnalyticsDashboard`
2. Import Recharts component
3. Wrap in responsive container
4. Add to grid layout
5. Style with design tokens

### Creating a New Page
1. Create folder in `/app` (e.g., `/app/new-feature`)
2. Create `page.tsx` in that folder
3. Import Navigation and Footer
4. Use max-width wrapper and padding
5. Add to Navigation links

## Performance Optimization

### Current Optimizations
- Server-side rendering with Next.js
- Static imports for components
- CSS-in-JS with Tailwind (no runtime)
- Image optimization through Next.js Image component
- Code splitting via route-based imports

### Future Improvements
- Lazy load analytics page content
- Memoize expensive chart calculations
- Add service worker for offline support
- Implement data virtualization for large datasets
- Use React.memo for expensive components

## Testing Considerations

### Unit Testing
- Test prediction calculation logic separately
- Test form validation and state updates
- Test component rendering with different props

### Integration Testing
- Test navigation between pages
- Test form submission and result display
- Test sample scenario loading

### E2E Testing
- Test complete prediction workflow
- Test analytics dashboard loads correctly
- Test responsive behavior on different screen sizes

## Deployment

### Vercel Deployment (Recommended)
```bash
# 1. Push to GitHub
git add .
git commit -m "Thermal comfort predictor"
git push

# 2. Connect to Vercel
vercel --prod
```

### Environment Variables
Currently no external API keys needed (predictions are simulated).

For production with real ML model:
- Add `ML_MODEL_API_URL`
- Add `NEXT_PUBLIC_API_KEY` (if public endpoint)

### Build Optimization
```bash
npm run build
# Check for warnings or unused dependencies
npm run lint
```

## Common Tasks

### Updating Color Scheme
1. Edit `/app/globals.css`
2. Modify oklch values in `:root` section
3. All components automatically inherit new colors

### Modifying Navigation Links
1. Edit `/components/navigation.tsx`
2. Update links in the navigation div
3. Add corresponding pages in `/app`

### Adding Model Information
1. Update `/components/prediction-form.tsx` prediction logic
2. Update model stats in info cards
3. Update `/components/analytics-dashboard.tsx` metrics

## Debugging Tips

### Check Component Props
```tsx
console.log("[v0] Props:", props);
```

### Monitor State Changes
```tsx
console.log("[v0] Form data:", formData);
```

### Verify Calculations
```tsx
console.log("[v0] THI calculated:", thi);
```

### Remove Debug Logs When Done
Use Find/Replace to remove all `console.log("[v0]")` statements

## Browser DevTools

### React DevTools
- Inspect component hierarchy
- View and modify state/props
- Track re-renders

### Tailwind CSS DevTools
- See which Tailwind classes are applied
- Check responsive breakpoints
- Verify color values

### Network Tab
- Monitor API calls (future)
- Check asset loading times
- Verify caching headers

## Related Documentation

- [Next.js Documentation](https://nextjs.org)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Recharts Documentation](https://recharts.org)

## Support & Troubleshooting

### Common Issues

**Issue**: Chart not rendering
- Check browser console for errors
- Verify Recharts is installed: `npm list recharts`
- Check container has explicit height

**Issue**: Colors not updating
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check globals.css for typos

**Issue**: Navigation links not working
- Verify page exists in `/app` folder
- Check route path matches link href
- Test without trailing slashes

### Getting Help
- Check Next.js documentation first
- Review component source code
- Test in isolation
- Check browser DevTools for errors

---

Last updated: January 2026
