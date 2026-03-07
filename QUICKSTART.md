# Quick Start Guide - Thermal Comfort Predictor

## 30-Second Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# Navigate to http://localhost:3000
```

Done! The app is now running.

## Using the Application

### Making Your First Prediction

1. **Open the Predictor** - You'll see the prediction interface on the home page
2. **Enter Parameters** - Adjust these values:
   - 🌡️ **Temperature** - Set to 22°C (comfortable range)
   - 💧 **Humidity** - Set to 50% (ideal)
   - 💨 **Air Velocity** - Set to 0.1 m/s (slight breeze)
   - 🏃 **Metabolic Rate** - Set to 1.0 met (sedentary)
   - 👕 **Clothing** - Set to 0.5 clo (light clothing)
3. **Click Predict** - The AI will predict comfort level
4. **View Results** - See comfort status and confidence score

### Try Sample Scenarios

Instead of entering parameters manually, click any sample scenario:
- 🏢 **Ideal Office** - Shows comfortable office environment
- ☀️ **Hot Summer** - Warm, humid conditions (uncomfortable)
- ❄️ **Cold Winter** - Cool with heavy clothing (comfortable)
- 💪 **Active Workout** - High activity in cool room (uncomfortable)

### Explore Analytics

1. Click the **Analytics** tab in navigation
2. View comprehensive dashboards showing:
   - 📊 Key metrics and statistics
   - 📈 Temperature vs comfort patterns
   - 💧 Humidity distribution analysis
   - 🤖 Model performance comparison
   - ⭐ Feature importance rankings

## Understanding the Results

### Comfort Status
- **✓ Comfortable** - Green indicator: conditions are favorable
- **✗ Uncomfortable** - Red indicator: conditions need adjustment

### Confidence Score
- **80-100%** - High confidence in prediction
- **70-80%** - Good confidence
- **Below 70%** - Lower confidence (edge cases)

### Thermal Humidity Index (THI)
- **Optimal**: 15-28°C
- **Below 15**: Too cold
- **Above 28**: Too hot

## Key Insights

### What Makes Comfort?
1. **Temperature** (28% importance) - Most critical factor
2. **Humidity** (22% importance) - Affects perceived temperature
3. **Air Movement** (18% importance) - Helps heat dissipation
4. **Activity Level** (16% importance) - Heat generation varies
5. **Clothing** (16% importance) - Insulation affects comfort

### Optimal Conditions
- **Temperature**: 22-24°C
- **Humidity**: 45-55%
- **Air Velocity**: 0.1-0.3 m/s
- **Activity**: Light work or sedentary (< 1.5 met)
- **Clothing**: Light to moderate (0.3-0.8 clo)

## Tips & Tricks

### Quick Adjustments
- Use **sample scenarios** to explore different conditions
- **Hover over charts** to see detailed values
- **Click metrics** for expanded information
- **Adjust sliders** gradually to see impact on predictions

### Real-World Applications
- **Office Management** - Set HVAC based on occupancy
- **Building Design** - Optimize thermal comfort in spaces
- **Climate Control** - Balance energy efficiency with comfort
- **Workplace Wellness** - Improve employee satisfaction

## Troubleshooting

### Not Seeing Predictions?
- Make sure you clicked "Predict Comfort Level" button
- Check that all parameters are within reasonable ranges
- Try a sample scenario to verify functionality

### Charts Not Loading?
- Refresh the page (F5)
- Check internet connection
- Try a different browser

### Parameters Feel Limited?
- You can manually type any value into input fields
- Use decimal points for more precision (e.g., 22.5°C)
- Sliders are for quick adjustments

## Next Steps

### Explore Features
- [ ] Try all 4 sample scenarios
- [ ] Switch between Predictor and Analytics
- [ ] Experiment with extreme values
- [ ] Check how each parameter affects results

### Learn More
- Read the full [README.md](README.md) for detailed documentation
- Check [DEVELOPMENT.md](DEVELOPMENT.md) for technical details
- Review model information in the info cards

### Provide Feedback
- Found a bug? Report it in issues
- Have suggestions? Create a feature request
- Questions? Check the documentation

## Command Reference

### Development
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Check code quality
```

### Useful Keyboard Shortcuts
- `F5` - Refresh page
- `Ctrl+Shift+R` - Hard refresh (clear cache)
- `F12` - Open browser DevTools
- `Ctrl+K` - Command palette (in some tools)

## API Integration (Future)

When connected to a real ML model API:

```bash
# Environment variables needed:
ML_MODEL_API_URL=your-api-endpoint
ML_MODEL_API_KEY=your-api-key
```

Then modify `/components/prediction-form.tsx`:
```tsx
const response = await fetch(process.env.ML_MODEL_API_URL, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.ML_MODEL_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});
```

## System Requirements

- **Node.js**: 18.0 or higher
- **npm**: 8.0 or higher
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)
- **Disk Space**: ~200MB for node_modules
- **RAM**: 512MB minimum

## Getting Help

1. **Check Documentation** - [README.md](README.md) has comprehensive info
2. **Review Examples** - Look at sample scenarios for reference
3. **Inspect Code** - Component source is well-commented
4. **Check Console** - Browser DevTools shows helpful errors

## Deployment

### Deploy to Vercel (1 minute)
```bash
# 1. Connect GitHub repository
git push origin main

# 2. Create new project on Vercel
# Select your GitHub repository

# 3. Click Deploy
# Your app is live!
```

Visit your deployed app URL to see it in production.

## Keyboard Navigation

- `Tab` - Move between fields
- `Enter` - Submit form or activate button
- `Arrow keys` - Adjust number inputs (when focused)
- `Space` - Toggle buttons/checkboxes

## Accessibility

- ✓ Keyboard navigation support
- ✓ Screen reader compatible
- ✓ High contrast dark theme
- ✓ Clear focus indicators
- ✓ Semantic HTML structure

---

**Questions?** Check the [README.md](README.md) or [DEVELOPMENT.md](DEVELOPMENT.md) for more details.

**Ready to explore?** Start with a sample scenario and see what happens! 🚀
