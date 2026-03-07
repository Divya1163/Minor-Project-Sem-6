# Complete Installation & Setup Guide

## System Overview

This is a production-ready, full-stack thermal comfort prediction application featuring:

- **Frontend**: Next.js 16 + React 19 + TypeScript
- **ML Backend**: Python Random Forest trainer + Node.js API
- **Hybrid Predictions**: Client-side + Server-side capabilities
- **Data**: ASHRAE Global Thermal Comfort Database II
- **Deployment**: Ready for Vercel, Docker, or traditional servers

## Quick Start (5 minutes)

### 1. Installation

```bash
# Clone or download the project
git clone <your-repo>
cd thermal-comfort-predictor

# Install dependencies
npm install

# (Optional) Install Python dependencies for training
pip install pandas numpy scikit-learn joblib
```

### 2. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 3. Try Predictions

- Use the prediction form on the home page
- Try the "Sample Scenarios" buttons
- Toggle between Client and Server predictions
- Check the "ML Model" page for performance metrics

## Complete Setup (with ML Model Training)

### Prerequisites

- **Node.js**: 18+ (https://nodejs.org/)
- **Python**: 3.9+ (https://www.python.org/)
- **Kaggle Account**: For dataset download (free)

### Step 1: Project Setup

```bash
# Clone project
git clone <your-repo>
cd thermal-comfort-predictor

# Install Node dependencies
npm install

# Create Python virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install Python dependencies
pip install pandas numpy scikit-learn joblib
```

### Step 2: Download ASHRAE Dataset

#### Option A: Kaggle API (Recommended)

```bash
# Install Kaggle CLI
pip install kaggle

# Set up Kaggle credentials
# 1. Go to https://www.kaggle.com/settings/account
# 2. Click "Create New API Token"
# 3. Save to ~/.kaggle/kaggle.json (or %USERPROFILE%\.kaggle\kaggle.json on Windows)

# Create data directory
mkdir -p scripts/data

# Download dataset
kaggle datasets download -d claytonmiller/ashrae-global-thermal-comfort-database-ii
unzip ashrae-global-thermal-comfort-database-ii.zip -d scripts/data/
```

#### Option B: Manual Download

1. Visit: https://www.kaggle.com/datasets/claytonmiller/ashrae-global-thermal-comfort-database-ii
2. Click "Download" button
3. Extract ZIP file
4. Place CSV in `scripts/data/`

Expected file: `scripts/data/ASHRAE_DB2.csv` (or similar name)

### Step 3: Train ML Model

```bash
# Activate Python virtual environment if not already
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Run training script
python scripts/process_ashrae_data.py
```

**Expected Output:**
```
Loading data from scripts/data/ASHRAE_DB2.csv...
Loaded 2156 records with 42 columns

Processing data...
Train set: 1727 samples
Test set: 431 samples

Training Random Forest model...
Model training completed!

Train Accuracy: 0.8234
Test Accuracy: 0.7815

Feature Importance:
  Temperature (Ta):     35.0%
  Humidity (RH):        25.0%
  Air Velocity (v):     18.0%
  ...

Model saved to public/models/thermal_comfort_model.pkl
Scaler saved to public/models/thermal_comfort_scaler.pkl
Metrics saved to public/models/model_metrics.json

✓ Training pipeline completed successfully!
```

### Step 4: Start Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

## Project Structure

```
thermal-comfort-predictor/
├── app/
│   ├── page.tsx                    # Home page (Predictor)
│   ├── analytics/
│   │   └── page.tsx                # Analytics dashboard
│   ├── model-performance/
│   │   └── page.tsx                # ML model metrics
│   ├── api/
│   │   └── predict/
│   │       └── route.ts            # Prediction API endpoint
│   └── layout.tsx                  # Root layout
├── components/
│   ├── ml-prediction-form.tsx      # Main prediction form
│   ├── model-performance.tsx       # Model metrics dashboard
│   ├── navigation.tsx              # Navigation bar
│   ├── analytics-dashboard.tsx     # Analytics charts
│   ├── sample-scenarios.tsx        # Quick-load scenarios
│   ├── footer.tsx                  # Footer component
│   └── ui/                         # Shadcn/ui components
├── lib/
│   ├── ml-model.ts                 # Client-side ML model
│   └── utils.ts                    # Utility functions
├── scripts/
│   ├── process_ashrae_data.py      # ML training pipeline
│   └── data/                        # ASHRAE dataset (add here)
├── public/
│   └── models/                      # Trained models (created after training)
│       ├── thermal_comfort_model.pkl
│       ├── thermal_comfort_scaler.pkl
│       └── model_metrics.json
├── ML_SYSTEM.md                    # ML system documentation
├── INSTALLATION.md                 # This file
├── package.json                    # Node dependencies
├── tsconfig.json                   # TypeScript config
├── next.config.mjs                 # Next.js config
└── README.md                       # General readme
```

## Features Overview

### 1. Thermal Comfort Prediction (Home Page)

**Interactive form with:**
- Real-time parameter input validation
- 6 thermal parameters (Temperature, Humidity, Air Velocity, Activity, Clothing)
- Client/Server prediction mode toggle
- Sample scenarios for quick testing
- Confidence scoring
- Actionable recommendations

**Supported Scenarios:**
- Ideal Office Environment
- Hot Summer Conditions
- Cold Winter Conditions
- Active Exercise Session

### 2. ML Model Page

**Comprehensive model analytics:**
- Training vs test accuracy comparison
- Feature importance visualization
- Confusion matrix analysis
- Model architecture overview
- Training configuration details
- Performance insights

### 3. Analytics Dashboard

**Environmental data analysis:**
- Temperature distribution
- Humidity patterns
- Seasonal trends
- Comfort zone identification

## Configuration

### Environment Variables

Create `.env.local` (optional):

```env
# Model configuration
NEXT_PUBLIC_MODEL_VERSION=1.0.0
NEXT_PUBLIC_USE_SERVER_PREDICTIONS=true

# API configuration
NEXT_PUBLIC_API_TIMEOUT=5000
```

### Model Parameters (in `scripts/process_ashrae_data.py`)

Adjust for your needs:

```python
RandomForestClassifier(
    n_estimators=200,        # Number of trees (more = slower but more accurate)
    max_depth=20,            # Tree depth (larger = more complex)
    min_samples_split=5,     # Minimum samples to split node
    min_samples_leaf=2,      # Minimum samples in leaf node
    random_state=42,         # Random seed (for reproducibility)
    class_weight='balanced'  # Handle imbalanced classes
)
```

## Development Guide

### Adding New Features

1. **Custom Scenario:**
   - Edit `components/sample-scenarios.tsx`
   - Add new scenario object to `scenarios` array

2. **New Environmental Parameter:**
   - Add to `ThermalComfortInput` interface in `lib/ml-model.ts`
   - Update `calculatePMV()` function
   - Add form field in `components/ml-prediction-form.tsx`

3. **Custom ML Model:**
   - Modify `scripts/process_ashrae_data.py`
   - Change algorithm or parameters
   - Run training: `python scripts/process_ashrae_data.py`

### Testing Predictions

```typescript
// In browser console:
import { predictThermalComfort } from '@/lib/ml-model';

const result = predictThermalComfort({
  ta: 22, tr: 22, rh: 50, v: 0.1, met: 1.0, clo: 0.5
});

console.log(result);
// {
//   tsv: 0,
//   comfortCategory: 'Comfortable',
//   confidence: 0.85,
//   explanation: '...',
//   phdIndex: -0.15,
//   acceptabilityIndex: 8
// }
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Environment variables in Vercel dashboard
# Add any needed environment variables
```

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t thermal-comfort .
docker run -p 3000:3000 thermal-comfort
```

### Traditional Server

```bash
# Build
npm run build

# Start
npm start

# Or with PM2
pm2 start npm --name "thermal-comfort" -- start
```

## Troubleshooting

### Issue: "Module not found" errors

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Python script can't find data file

**Solution:**
```bash
# Verify file exists and rename if needed
ls scripts/data/
# Expected: ASHRAE_DB2.csv or similar

# Edit script if different name:
# In process_ashrae_data.py, update possible_files list
```

### Issue: Model predictions seem random

**Solution:**
- Verify client-side model is being used (check browser console)
- Try server-side prediction (toggle in form)
- Check input parameter ranges

### Issue: API endpoint returns 500 error

**Solution:**
```bash
# Check Next.js dev server logs
npm run dev

# Verify API route exists:
curl http://localhost:3000/api/predict
# Should return: {"model": "Thermal Comfort...", ...}
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use different port
npm run dev -- -p 3001

# Or find and kill process
# macOS/Linux:
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## Performance Optimization

### Client-Side Model

Tiny (~300 lines) - downloads in milliseconds
No external ML libraries needed

### Server-Side Model

Full trained model - optimal accuracy
Scales with multiple servers

### Hybrid Strategy

1. Always use client prediction (instant)
2. Fetch server prediction in background
3. Compare results
4. Alert if discrepancy

## Monitoring & Debugging

### Enable Debug Logging

In browser console:

```typescript
// Check model predictions
const { predictThermalComfort } = await import('@/lib/ml-model');
console.log(predictThermalComfort({ta: 22, tr: 22, rh: 50, v: 0.1, met: 1.0, clo: 0.5}));
```

### Check API Responses

```bash
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"ta":22,"tr":22,"rh":50,"v":0.1,"met":1.0,"clo":0.5}'
```

## Updating Models

### Train New Model

```bash
# Ensure new data in scripts/data/
python scripts/process_ashrae_data.py

# Models automatically saved to public/models/
# Application will use updated models on next deployment
```

### Backup Old Models

```bash
mkdir -p backups
cp -r public/models backups/models_v1_backup
```

## Support & Resources

### Documentation
- `ML_SYSTEM.md` - Comprehensive ML system documentation
- `README.md` - General project documentation
- `QUICKSTART.md` - Quick reference guide

### External Resources
- ASHRAE Standard 55: https://www.ashrae.org/
- Thermal Comfort Database: https://www.kaggle.com/datasets/claytonmiller/ashrae-global-thermal-comfort-database-ii
- scikit-learn Documentation: https://scikit-learn.org/

### Getting Help

1. Check troubleshooting section above
2. Review ML_SYSTEM.md for architecture details
3. Check Next.js documentation: https://nextjs.org/docs
4. Check scikit-learn docs: https://scikit-learn.org/

## License

MIT License - See LICENSE file for details

## Next Steps

After installation:

1. ✓ Run development server: `npm run dev`
2. ✓ Visit http://localhost:3000
3. ✓ Try making predictions
4. ✓ Review ML Model page for metrics
5. ✓ Read ML_SYSTEM.md for deep dive
6. ✓ Train your own model with ASHRAE data
7. ✓ Deploy to production

## Quick Reference

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm start                # Start production server

# ML Training
python scripts/process_ashrae_data.py  # Train new model

# Linting
npm run lint             # Check code quality

# Cleaning
rm -rf .next node_modules  # Full clean
npm install                # Reinstall
```

Happy predicting! 🎯
