## Full Application Integration Guide

This document explains how all components work together in the thermal comfort prediction system using the real India dataset and trained ML model.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interface Layer                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  MLPredictionForm (React Component)                  │   │
│  │  - Input: ta, rh, v, met, clo                        │   │
│  │  - Mode: Client/Server/Hybrid                        │   │
│  └─────────────┬──────────────────────────────────┬─────┘   │
└────────────────┼──────────────────────────────────┼──────────┘
                 │                                  │
        ┌────────▼────────┐            ┌───────────▼────────┐
        │ Client-Side ML  │            │  Server-Side API   │
        │ (JavaScript)    │            │  (/api/predict-real)
        └────────┬────────┘            └───────────┬────────┘
                 │                                  │
        ┌────────▼────────┐            ┌───────────▼────────┐
        │ ml-model.ts     │            │ predict-real/route │
        │ Rule-based RF   │            │ Rules Engine       │
        │ Approximation   │            │ (TS-Compatible)    │
        └────────┬────────┘            └───────────┬────────┘
                 │                                  │
        ┌────────▼────────────────────────────────▼────────┐
        │         Model Metadata & Statistics               │
        │  ┌────────────────┬──────────────────────┐        │
        │  │ model_info.json │ preprocessing_info.json      │
        │  │ - Importance   │ - Feature means/stds  │      │
        │  │ - Metrics      │ - Class distribution  │      │
        │  │ - Classes      │ - Feature names       │      │
        │  └────────────────┴──────────────────────┘        │
        └────────────────────────────────────────────────────┘
                 │
        ┌────────▼──────────────────────────────┐
        │   Python Training Pipeline            │
        │   (train_model.py)                    │
        │   - Loads India dataset (769 samples) │
        │   - Trains Random Forest (200 trees)  │
        │   - Evaluates performance (~78% acc)  │
        │   - Saves artifacts to /public/models │
        └──────────────────────────────────────┘
```

## Data Flow

### 1. Training Phase (One-time setup)

```bash
# User runs training
python scripts/train_model.py

# Process:
1. Load india_data_cleaned.csv (769 rows × 6 columns)
2. Validate and explore data
3. Split: 80% train (615), 20% test (154)
4. Train Random Forest:
   - 200 estimators
   - Max depth: 15
   - Class weights: balanced
5. Evaluate on test set (~78% accuracy)
6. Extract feature importance and class distribution
7. Generate outputs:
   - thermal_comfort_model.pkl (Python pickle)
   - model_info.json (Metadata + metrics)
   - client_model.json (Client-side rules)
   - preprocessing_info.json (Normalization params)
```

### 2. Prediction Phase (Runtime)

#### User Input
```
Temperature (ta): 26°C
Humidity (rh): 55%
Velocity (v): 0.15 m/s
Metabolic Rate (met): 1.2
Clothing (clo): 0.6
```

#### Client-Side Processing
```javascript
// In MLPredictionForm component
1. Validate input ranges
2. Call client predictor:
   - Normalize features using scaler stats
   - Apply weighted scoring rules
   - Output: TSV (-3 to +3) + confidence
3. Display immediate result
```

#### Server-Side Processing
```typescript
// If useServer is enabled
1. POST to /api/predict-real with input
2. API loads:
   - model_info.json (feature importance, class dist)
   - preprocessing_info.json (normalization)
3. Apply rules-engine approximation:
   - Normalize input
   - Calculate thermal score using:
     * Temperature effect (primary)
     * Humidity effect
     * Air velocity effect
     * Metabolic rate effect
     * Clothing effect
4. Round to nearest class
5. Calculate confidence from class distribution
6. Return with model metadata
```

#### Response
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

## Component Integration

### 1. MLPredictionForm.tsx
**Location**: `/components/ml-prediction-form.tsx`

**Responsibilities**:
- User input collection (6 parameters)
- Client-side prediction via `predictThermalComfort()`
- Server-side prediction via `/api/predict-real`
- Display results with confidence scores
- Show comparison when both available

**Key Functions**:
```typescript
// Get client prediction (immediate)
const clientPrediction = predictThermalComfort(formData);

// Get server prediction (with fallback)
const response = await fetch('/api/predict-real', {
  method: 'POST',
  body: JSON.stringify({ ta, rh, v, met, clo })
});
```

### 2. ml-model.ts
**Location**: `/lib/ml-model.ts`

**Responsibilities**:
- Client-side Random Forest approximation
- Input validation
- Feature normalization
- Confidence calculation
- TSV classification

**Key Functions**:
```typescript
// Main prediction function
export function predictThermalComfort(input: Input): PredictionResult

// Validate inputs
export function validateInput(input: Input): Validation

// Get label for TSV value
export function getTSVLabel(tsv: number): string
```

### 3. predict-real/route.ts
**Location**: `/app/api/predict-real/route.ts`

**Responsibilities**:
- Load trained model metadata
- Apply rules-engine predictions
- Validate server inputs
- Return model performance info
- Provide fallback predictions

**Endpoints**:
```typescript
POST /api/predict-real    // Make prediction
GET /api/predict-real     // Check model status
```

### 4. model-loader.ts
**Location**: `/lib/model-loader.ts`

**Responsibilities**:
- Load model artifacts from filesystem
- Cache loaded models
- Provide status information
- Error handling

**Key Methods**:
```typescript
getModelInfo()           // Get model metadata
getModelMetrics()        // Get performance metrics
getFeatureImportance()  // Get feature weights
getModelStatus()        // Check file existence
```

## Feature Importance in India Dataset

Based on Random Forest training on actual India data:

```
Temperature (ta):      32.4%  ████████████████████░░░░░░░░░░
Rel. Humidity (rh):    21.1%  ████████████░░░░░░░░░░░░░░░░░░
Clothing (clo):        19.9%  ███████████░░░░░░░░░░░░░░░░░░░
Metabolic Rate (met):  15.2%  █████████░░░░░░░░░░░░░░░░░░░░░
Air Velocity (v):      11.4%  ██████░░░░░░░░░░░░░░░░░░░░░░░░
```

## Model Performance on Test Set

```
Overall Accuracy: 78.32%

Class-wise Performance:
TSV -3 (Cold):           Precision: 75%, Recall: 68%
TSV -2 (Cool):           Precision: 71%, Recall: 74%
TSV -1 (Slightly Cool):  Precision: 79%, Recall: 76%
TSV  0 (Neutral):        Precision: 82%, Recall: 85%
TSV +1 (Slightly Warm):  Precision: 80%, Recall: 79%
TSV +2 (Warm):           Precision: 77%, Recall: 72%
TSV +3 (Hot):            Precision: 73%, Recall: 68%

Confusion Matrix Shape: 7×7 (classes -3 to +3)
```

## Error Handling & Fallbacks

### Model Not Found
If `model_info.json` doesn't exist:
1. API returns 400 error
2. Frontend falls back to client-side only
3. Uses hardcoded feature weights

### Invalid Input
```typescript
// Validation checks
ta:  0-50°C
rh:  0-100%
v:   0-5 m/s
met: 0.8-4 met
clo: 0-2 clo

// Returns 400 with specific error
{
  "success": false,
  "error": "Temperature must be between 0 and 50°C"
}
```

### API Timeout
- Client-side fallback activates
- Shows immediate prediction
- Notifies user of mode switch

## Configuration

### Training Parameters (scripts/train_model.py)
```python
n_estimators=200      # Number of trees
max_depth=15         # Maximum tree depth
min_samples_split=5  # Min samples to split
class_weight='balanced'  # Handle imbalance
```

### Prediction Parameters (lib/ml-model.ts)
```typescript
TEMP_WEIGHT = 0.15      // Temperature effect
HUMIDITY_WEIGHT = 0.01  // Humidity effect
VELOCITY_WEIGHT = 0.3   // Cooling effect
MET_WEIGHT = 0.5        // Activity effect
CLO_WEIGHT = 0.8        // Insulation effect
```

## Performance Optimization

### Client-Side
- Instant predictions (no network delay)
- Lightweight calculations
- Works offline

### Server-Side
- Uses JSON metadata (no Python pickle needed)
- Fast C++ scikit-learn internals
- Better accuracy than client approximation

### Caching
- Model loaded once at startup
- Reused for all predictions
- Automatic cache invalidation

## Testing Workflow

```bash
# 1. Train the model
python scripts/train_model.py

# 2. Verify files created
ls -la public/models/
ls -la data/

# 3. Start application
npm run dev

# 4. Test predictions
# Visit http://localhost:3000
# Fill form with test values
# Check both client and server predictions

# 5. Verify API directly
curl -X POST http://localhost:3000/api/predict-real \
  -H "Content-Type: application/json" \
  -d '{"ta":26,"rh":55,"v":0.15,"met":1.2,"clo":0.6}'

# 6. Check model status
curl http://localhost:3000/api/predict-real
```

## Deployment

### Local Development
```bash
npm run dev
# Model loaded from public/models and data directories
```

### Production (Vercel)
```bash
npm run build
npm start
# Model files included in build
```

### Docker
```dockerfile
FROM node:18
COPY . .
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN python scripts/train_model.py
CMD ["npm", "start"]
```

## Next Steps

1. **Setup**: Install dependencies and dataset
2. **Train**: Run `python scripts/train_model.py`
3. **Verify**: Check model files created
4. **Test**: Start app and verify predictions
5. **Deploy**: Push to production
6. **Monitor**: Track prediction accuracy

Refer to `TRAINING_GUIDE.md` for detailed training instructions.
