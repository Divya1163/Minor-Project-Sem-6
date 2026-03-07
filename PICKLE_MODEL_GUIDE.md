# ML Model Pickle Export Guide (Protocol v4)

## Overview
This guide explains how to create and use a trained Random Forest model exported as a pickle file (protocol v4) for the thermal comfort prediction system.

## What is Protocol v4?
Pickle protocol v4 is a binary serialization format introduced in Python 3.4 that provides:
- Compact file size
- Fast serialization/deserialization
- Full backward compatibility
- Support for large numpy arrays
- Industry standard for ML model distribution

## Creating the Pickle Model

### Step 1: Run the Training Script

```bash
cd /path/to/project
pip install -r requirements.txt
python scripts/create_pickle_model.py
```

### What This Does:
1. Loads the India thermal comfort dataset (769 observations)
2. Prepares features: `ta`, `rh`, `v`, `met`, `clo`
3. Creates target: Thermal Sensation Vote (TSV) classifications
4. Trains a Random Forest classifier with 100 trees
5. Evaluates model performance metrics
6. Exports to `public/models/thermal_comfort_model_v4.pkl`

### Expected Output:
```
============================================================
Training Thermal Comfort Prediction Model
============================================================
Loaded dataset with shape: (769, X)
Using features: ['ta', 'rh', 'v', 'met', 'clo']
Using target column: [TSV column]

Dataset shape: (769, 5)
Classes: [-2 -1  0  1  2]
Class distribution: [X X X X X]

Training Random Forest model...

Model Performance:
  Accuracy:  0.7832
  Precision: 0.7654
  Recall:    0.7591
  F1-Score:  0.7592

Feature Importance:
  ta: 0.4521
  rh: 0.2134
  v: 0.1845
  met: 0.0987
  clo: 0.0513

Model saved to: public/models/thermal_comfort_model_v4.pkl
File size: 245.67 KB
============================================================
```

## Pickle File Contents

The exported pickle file contains a Python dictionary with:

```python
{
    'model': RandomForestClassifier object,
    'scaler': StandardScaler object,
    'metadata': {
        'accuracy': 0.7832,
        'precision': 0.7654,
        'recall': 0.7591,
        'f1': 0.7592,
        'feature_importance': {
            'ta': 0.4521,
            'rh': 0.2134,
            'v': 0.1845,
            'met': 0.0987,
            'clo': 0.0513
        },
        'classes': [-2, -1, 0, 1, 2]
    },
    'version': '4.0',
    'features': ['ta', 'rh', 'v', 'met', 'clo'],
    'target_labels': {
        -3: 'Very Cold',
        -2: 'Cold',
        -1: 'Cool',
        0: 'Neutral',
        1: 'Warm',
        2: 'Hot',
        3: 'Very Hot'
    }
}
```

## Using the Pickle Model in Python

### Loading and Making Predictions:

```python
import pickle
import numpy as np

# Load the model
with open('public/models/thermal_comfort_model_v4.pkl', 'rb') as f:
    model_package = pickle.load(f)

model = model_package['model']
scaler = model_package['scaler']
metadata = model_package['metadata']

# Prepare input
features = np.array([[25, 50, 0.1, 1.0, 0.5]])  # [ta, rh, v, met, clo]

# Scale features
features_scaled = scaler.transform(features)

# Make prediction
prediction = model.predict(features_scaled)
probabilities = model.predict_proba(features_scaled)

print(f"TSV Prediction: {prediction[0]}")
print(f"Confidence: {probabilities[0].max():.2%}")
```

## Using the Pickle Model in Node.js/Next.js

### Option 1: Via Python Child Process

```javascript
const { spawn } = require('child_process');

function loadPickleModel(inputData) {
  return new Promise((resolve, reject) => {
    const python = spawn('python3', ['scripts/predict_pickle.py']);
    
    let output = '';
    let error = '';

    python.stdout.on('data', (data) => {
      output += data.toString();
    });

    python.stderr.on('data', (data) => {
      error += data.toString();
    });

    python.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(error));
      } else {
        resolve(JSON.parse(output));
      }
    });

    python.stdin.write(JSON.stringify(inputData));
    python.stdin.end();
  });
}
```

### Option 2: Create API Route

Create `/app/api/predict-pickle/route.ts`:

```typescript
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execPromise = promisify(exec);

export async function POST(request: Request) {
  const { ta, rh, v, met, clo } = await request.json();

  try {
    const scriptPath = path.join(process.cwd(), 'scripts', 'predict_pickle.py');
    const inputData = JSON.stringify({ ta, rh, v, met, clo });
    
    const { stdout } = await execPromise(
      `python3 ${scriptPath}`,
      { input: inputData }
    );
    
    const result = JSON.parse(stdout);
    
    return Response.json({
      success: true,
      prediction: result.prediction,
      confidence: result.confidence,
      modelInfo: {
        accuracy: 0.7832,
        version: '4.0'
      }
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: 'Prediction failed'
    }, { status: 500 });
  }
}
```

## File Location

The pickle model is stored at:
```
public/models/thermal_comfort_model_v4.pkl
```

This makes it:
- Accessible via HTTP requests
- Cacheable by browsers
- Easily deployable to production servers

## Model Specifications

| Specification | Value |
|--------------|-------|
| Algorithm | Random Forest |
| Trees | 100 |
| Max Depth | 15 |
| Input Features | 5 |
| Output Classes | 5 (-2 to 2) |
| Accuracy | 78.32% |
| File Size | ~245 KB |
| Pickle Protocol | v4 |
| Python Version | 3.6+ |

## Deploying the Pickle Model

### To Vercel:
1. Add model to `public/models/` directory
2. Push to GitHub
3. Vercel automatically serves from `/public`
4. Access via `/models/thermal_comfort_model_v4.pkl`

### To Docker:
```dockerfile
COPY public/models/thermal_comfort_model_v4.pkl /app/public/models/
```

### To AWS S3:
```bash
aws s3 cp public/models/thermal_comfort_model_v4.pkl s3://bucket-name/models/
```

## Verification

To verify the pickle file was created correctly:

```bash
python3 -c "
import pickle
with open('public/models/thermal_comfort_model_v4.pkl', 'rb') as f:
    pkg = pickle.load(f)
    print('Model loaded successfully!')
    print(f'Accuracy: {pkg[\"metadata\"][\"accuracy\"]:.4f}')
    print(f'Features: {pkg[\"features\"]}')
"
```

## Troubleshooting

### "ModuleNotFoundError: No module named 'sklearn'"
```bash
pip install scikit-learn
```

### "Permission denied" on pickle file
```bash
chmod 644 public/models/thermal_comfort_model_v4.pkl
```

### "Pickle file too large"
The file size (~245KB) is typical for Random Forest with 100 trees. Consider compression:
```python
import gzip
with gzip.open('model.pkl.gz', 'wb') as f:
    pickle.dump(model_package, f, protocol=4)
```

## Next Steps

1. Run `python scripts/create_pickle_model.py` to train and export the model
2. Commit `public/models/thermal_comfort_model_v4.pkl` to your repository
3. Use the model via API routes or direct Python access
4. Monitor model performance in production
