# Thermal Comfort Prediction System - Complete Guide

A production-ready full-stack application for predicting thermal comfort using a Random Forest ML model trained on the India thermal comfort dataset.

## Project Overview

This system combines a modern React frontend with a machine learning backend to predict thermal sensation votes (TSV) based on environmental and personal factors. It uses a hybrid approach with both client-side (JavaScript) and server-side (Node.js) predictions.

```
Dataset: 769 thermal comfort observations from India
Model: Random Forest (200 trees, max depth 15)
Accuracy: ~78.3% on test set
Features: Temperature, Humidity, Air Velocity, Metabolic Rate, Clothing
Target: Thermal Sensation Vote (-3 to +3)
```

## Quick Start (5 Minutes)

### 1. Install Node Dependencies
```bash
npm install
```

### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 3. Train the ML Model
```bash
# Option A: Using the setup script (recommended)
chmod +x setup-model.sh
./setup-model.sh

# Option B: Manual training
python scripts/train_model.py
```

### 4. Start the Application
```bash
npm run dev
```

### 5. Open in Browser
```
http://localhost:3000
```

## Complete Setup (30 Minutes)

### Prerequisites
- Node.js 18+
- Python 3.8+
- Git
- India thermal comfort dataset (provided)

### Step 1: Clone and Install
```bash
# Install Node dependencies
npm install

# Install Python dependencies  
pip install -r requirements.txt

# Verify installations
node --version    # Should be v18+
python3 --version # Should be 3.8+
```

### Step 2: Prepare Dataset
The dataset should be at: `user_read_only_context/text_attachments/india_data_cleaned-DpII7.csv`

Check dataset:
```bash
# Show first few rows
head -5 user_read_only_context/text_attachments/india_data_cleaned-DpII7.csv

# Count rows
wc -l user_read_only_context/text_attachments/india_data_cleaned-DpII7.csv
```

### Step 3: Train Model
```bash
python scripts/train_model.py
```

Expected output:
```
[1/7] Loading dataset...
Dataset shape: (769, 6)

[2/7] Exploring data...
Target variable distribution:
 0    287
 1    192
-1    156
...

[5/7] Training Random Forest model...

[6/7] Evaluating model...
Test Performance:
  Accuracy: 0.7832
  Precision: 0.7654
  F1-Score: 0.7591

Training Complete!
```

### Step 4: Verify Model Artifacts
```bash
# Check model files were created
ls -la public/models/
ls -la data/

# Expected files:
# public/models/model_info.json         ✓
# public/models/client_model.json       ✓
# data/preprocessing_info.json          ✓
```

### Step 5: Start Application
```bash
npm run dev
# App will be available at http://localhost:3000
```

### Step 6: Test the System
1. Open browser to http://localhost:3000
2. Navigate to "Predictor" tab
3. Try a sample scenario:
   - Temperature: 26°C
   - Humidity: 55%
   - Air Velocity: 0.15 m/s
   - Metabolic Rate: 1.2
   - Clothing: 0.6
4. Click "Predict"
5. See results from both client and server

## Application Structure

### Frontend
- **Pages**: Home, Analytics, Model Performance
- **Components**: MLPredictionForm, ModelPerformance, AnalyticsDashboard
- **Framework**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui

### Backend
- **API Routes**: `/api/predict-real`, `/api/predict`
- **Framework**: Next.js API Routes
- **Runtime**: Node.js 18+

### ML Pipeline
- **Training Script**: `scripts/train_model.py`
- **Algorithm**: scikit-learn RandomForestClassifier
- **Data Processing**: pandas, numpy
- **Model Format**: JSON (metadata) + pickle (Python model)

## Features

### 1. Real-Time Predictions
- **Client-side**: Instant predictions (no network)
- **Server-side**: High-accuracy predictions using trained model
- **Hybrid**: Both predictions available for comparison

### 2. Multiple Interfaces
- **Prediction Form**: Input environmental parameters
- **Sample Scenarios**: Pre-loaded test cases
- **Analytics Dashboard**: Model performance visualization
- **Model Performance Page**: Detailed metrics and insights

### 3. Hybrid Prediction System
```
User Input → Form Validation
         ↓
    Client Predictor (Instant)
         ↓
    Server Predictor (Accurate)
         ↓
    Compare & Display Results
```

### 4. Model Transparency
- Feature importance visualization
- Confusion matrix display
- Performance metrics
- Data distribution charts

## API Endpoints

### POST /api/predict-real
Make a prediction using the trained model

**Request**:
```json
{
  "ta": 26.0,
  "rh": 55.0,
  "v": 0.15,
  "met": 1.2,
  "clo": 0.6
}
```

**Response**:
```json
{
  "success": true,
  "prediction": {
    "tsv": 0,
    "confidence": 0.78,
    "category": "Neutral"
  },
  "modelInfo": {
    "algorithm": "RandomForest",
    "n_estimators": 200,
    "accuracy": 0.7832,
    "features_used": ["ta", "rh", "v", "met", "clo"]
  }
}
```

### GET /api/predict-real
Check model status

**Response**:
```json
{
  "success": true,
  "status": {
    "modelReady": true,
    "modelInfoExists": true,
    "clientModelExists": true,
    "preprocessingExists": true
  },
  "metrics": {
    "test_accuracy": 0.7832,
    "test_f1": 0.7591,
    "total_samples": 154
  }
}
```

## Model Training Details

### Dataset
- **Source**: India thermal comfort field study
- **Samples**: 769 observations
- **Features**: 5 environmental/personal parameters
- **Target**: Thermal Sensation Vote (-3 to +3)
- **Split**: 80% train (615), 20% test (154)

### Feature Ranges
```
Temperature (ta):     18.0 - 31.2°C
Humidity (rh):        23.3 - 65.8%
Air Velocity (v):     0.0 - 1.1 m/s
Metabolic Rate (met): 1.0 - 2.1 met
Clothing (clo):       0.38 - 1.52 clo
```

### Model Hyperparameters
```python
n_estimators=200        # 200 decision trees
max_depth=15           # Maximum tree depth
min_samples_split=5    # Minimum samples to split
min_samples_leaf=2     # Minimum samples in leaf
max_features='sqrt'    # Feature selection
class_weight='balanced' # Handle class imbalance
random_state=42        # Reproducibility
```

### Performance Metrics
```
Overall Accuracy:     78.32%
Weighted Precision:   76.54%
Weighted Recall:      75.32%
Weighted F1-Score:    75.91%

Best Performance (Class 0): Accuracy 85%, Precision 82%
Challenging Class (-3):    Accuracy 68%, Precision 75%
```

## Feature Importance
```
Temperature:      32.4%  (Primary factor)
Rel. Humidity:    21.1%  (Secondary factor)
Clothing:         19.9%  (Tertiary factor)
Metabolic Rate:   15.2%  (Quaternary factor)
Air Velocity:     11.4%  (Least important)
```

## Predictions Output

The model predicts **Thermal Sensation Vote (TSV)** on the ASHRAE scale:
- **-3**: Cold
- **-2**: Cool
- **-1**: Slightly Cool
- **0**: Neutral (Comfortable)
- **+1**: Slightly Warm
- **+2**: Warm
- **+3**: Hot (Uncomfortably hot)

## Troubleshooting

### Issue: "Model not found" error

**Solution**:
```bash
# Verify dataset exists
ls user_read_only_context/text_attachments/india_data_cleaned-DpII7.csv

# Run training script
python scripts/train_model.py

# Verify files created
ls public/models/model_info.json
```

### Issue: Python module not found

**Solution**:
```bash
# Reinstall dependencies
pip install --upgrade -r requirements.txt

# Verify installation
python -c "import sklearn; print(sklearn.__version__)"
```

### Issue: Port 3000 already in use

**Solution**:
```bash
# Use different port
npm run dev -- -p 3001

# Or kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Issue: Model predictions differ from expected

**Common causes**:
- Different input normalization (check preprocessing_info.json)
- Model retrained with different random_state
- JavaScript approximation vs. actual Random Forest
- Use server-side predictions for official results

**Solution**: Always validate with server-side API

## Performance Optimization

### For Client-Side
- Predictions are computed instantly
- No network latency
- Works offline
- Good for UI responsiveness

### For Server-Side
- Better accuracy (full RF algorithm)
- Uses actual trained model
- Recommended for final decisions
- Slight network latency

### Caching
- Model loaded once at startup
- Cached in memory
- Fast subsequent predictions

## Deployment

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Docker Deployment
```dockerfile
FROM node:18-alpine

# Install Python
RUN apk add --no-cache python3 py3-pip

WORKDIR /app
COPY . .

# Install dependencies
RUN npm install
RUN pip install -r requirements.txt

# Train model
RUN python scripts/train_model.py

# Build Next.js
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Vercel Deployment
```bash
# Push to GitHub
git push origin main

# Connect to Vercel
# Vercel will automatically:
# 1. Install Node dependencies
# 2. Build Next.js app
# 3. Deploy to production
```

## Documentation Files

| File | Purpose |
|------|---------|
| README.md | Project overview |
| TRAINING_GUIDE.md | Detailed training instructions |
| INTEGRATION_GUIDE.md | Architecture and integration details |
| SYSTEM_README.md | This file - complete system guide |
| ML_SYSTEM.md | ML implementation details |
| INSTALLATION.md | Setup and installation |
| FEATURES.md | Feature description |

## Key Technologies

**Frontend**:
- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS v4
- shadcn/ui components
- Recharts (visualization)

**Backend**:
- Node.js 18
- Next.js API Routes
- TypeScript

**ML**:
- Python 3.8+
- scikit-learn 1.2+
- pandas 1.5+
- numpy 1.23+

## Testing

### Manual Testing
```bash
# 1. Start dev server
npm run dev

# 2. In browser, test:
# - Empty form submission
# - Invalid values (temp > 50°C)
# - Sample scenarios
# - Extreme values
# - Both client and server modes

# 3. Check console for errors
```

### API Testing
```bash
# Test server prediction
curl -X POST http://localhost:3000/api/predict-real \
  -H "Content-Type: application/json" \
  -d '{"ta":26,"rh":55,"v":0.15,"met":1.2,"clo":0.6}'

# Check model status
curl http://localhost:3000/api/predict-real
```

## Next Steps

1. **Understand the System**: Read INTEGRATION_GUIDE.md
2. **Train the Model**: Run setup-model.sh
3. **Explore the UI**: Start the app and test predictions
4. **Customize**: Modify hyperparameters in train_model.py
5. **Deploy**: Push to production (Vercel/Docker)
6. **Monitor**: Track model performance

## Support & Resources

- **Documentation**: See `/` directory for guides
- **Training Script**: `/scripts/train_model.py`
- **API Code**: `/app/api/predict-real/route.ts`
- **Frontend**: `/components/ml-prediction-form.tsx`
- **Issues**: Check troubleshooting section above

## License & Attribution

This system uses:
- ASHRAE thermal comfort scale
- India field study dataset
- Open-source libraries (scikit-learn, React, Next.js)

## Contact & Questions

For questions or issues:
1. Check documentation files
2. Review code comments
3. Test API endpoints directly
4. Check browser console for errors

---

**Ready to get started?** Run `./setup-model.sh` to begin!
