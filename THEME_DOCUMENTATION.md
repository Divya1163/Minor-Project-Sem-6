# Modern Theme Documentation

## Theme Overview

The application now features a **modern, professional dark theme** with sophisticated color gradients and enhanced visual hierarchy. This theme is optimized for thermal comfort prediction analytics with focus on clarity and engagement.

## Color Palette

### Primary Colors

| Color | Hex | Usage | Purpose |
|-------|-----|-------|---------|
| Background | #0f0f1e | Main app background | Deep navy for reduced eye strain |
| Card | #1a1a2e | Card backgrounds | Subtle contrast with main background |
| Popover | #16213e | Popover/modals | Elevated depth layer |
| Foreground | #f5f5ff | Text | High contrast white for readability |

### Brand Colors

| Color | Hex | Usage | Purpose |
|-------|-----|-------|---------|
| Primary | #7c3aed | Buttons, links, accents | Modern purple for professionalism |
| Secondary | #64748b | Secondary elements | Neutral slate for support |
| Accent | #14b8a6 | Highlights, focus states | Vibrant teal for energy & focus |
| Destructive | #f97316 | Warnings, errors | Orange-red for attention |

### Supporting Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Muted | #2d3748 | Muted backgrounds |
| Muted Foreground | #a0aec0 | Disabled/secondary text |
| Border | #2d3748 | Component borders |
| Ring | #7c3aed | Focus rings |

### Chart Colors

| Chart ID | Color | Hex | Usage |
|----------|-------|-----|-------|
| 1 | Teal | #14b8a6 | Primary data series |
| 2 | Violet | #8b5cf6 | Secondary data series |
| 3 | Cyan | #06b6d4 | Tertiary data series |
| 4 | Orange | #f97316 | Warning/alert data |
| 5 | Pink | #ec4899 | Highlight/special data |

## Design Tokens

All colors use CSS custom properties defined in `/app/globals.css`:

```css
--background: #0f0f1e
--foreground: #f5f5ff
--primary: #7c3aed
--accent: #14b8a6
--destructive: #f97316
```

## Visual Effects

### Gradients

- **Body Gradient**: 135° diagonal from navy to deep blue
- **Card Gradient**: Subtle 135° gradient from card to popover
- **Text Gradient**: Foreground to accent on logo/headings

### Effects

- **Shadows**: Purple-tinted shadows for depth
- **Backdrop Blur**: 12px blur on navigation for glassmorphism
- **Transitions**: 200-300ms cubic-bezier easing for smooth interactions
- **Hover States**: Subtle lift (2px transform) with shadow increase

## Usage Guidelines

### Semantic Usage

```jsx
// Primary brand colors
<button className="bg-primary text-primary-foreground">Save</button>

// Accent for focus/highlights
<a className="text-accent hover:text-accent">Learn more</a>

// Muted for secondary content
<p className="text-muted-foreground">Help text</p>

// Destructive for warnings
<button className="bg-destructive text-destructive-foreground">Delete</button>
```

### Background Layers

| Layer | Color | Use Case |
|-------|-------|----------|
| L0 (Background) | #0f0f1e | Main viewport |
| L1 (Card) | #1a1a2e | Cards, containers |
| L2 (Popover) | #16213e | Popovers, modals |
| L3 (Muted) | #2d3748 | Muted backgrounds |

## Component Styling

### Navigation
- Gradient background with backdrop blur
- Active state: Accent color with glow effect
- Hover state: Subtle primary background
- Logo: Gradient text with icon container

### Cards
- Gradient background (card → popover)
- Purple-tinted borders (opacity 15%)
- Shadow with primary color tint
- Smooth rounded corners (10px)

### Buttons
- Primary: Purple with white text
- Hover: Lifted with purple shadow
- Active: Darker purple shade
- Disabled: Greyed out state

### Input Fields
- Background: Popover color
- Border: Border color with focus ring
- Focus: Purple ring (primary color)

## Responsive Design

The theme maintains consistency across:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

All colors and gradients adapt responsively without media queries needed.

## Accessibility

### Contrast Ratios

- Text on background: 18:1 (AAA compliant)
- Text on card: 16:1 (AAA compliant)
- Text on accents: 7:1 (AA compliant)

### Focus Indicators

- Ring color: Primary (#7c3aed)
- Ring width: 2px
- Ring offset: 2px
- Clearly visible on all interactive elements

## Customization

To modify theme colors, edit `/app/globals.css`:

```css
:root {
  --primary: #7c3aed;      /* Change brand color */
  --accent: #14b8a6;       /* Change highlight color */
  --background: #0f0f1e;   /* Change background */
}
```

All components automatically adapt using CSS custom properties.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Custom Properties support required
- Backdrop filter support for optimal effect
- Fallback to solid colors if backdrop blur not supported

## Performance

- No external theme CSS required
- Variables calculated at stylesheet parse time
- Minimal runtime overhead
- Optimized gradient rendering

## Future Enhancements

Potential theme additions:
- Light theme variant
- High contrast mode
- Colorblind-friendly palette
- Theme switching UI
- Custom theme builder
