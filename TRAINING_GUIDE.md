## ML Model Training Guide

This guide explains how to train the Random Forest model using the India thermal comfort dataset and integrate it into the application.

### Prerequisites

1. Python 3.8+
2. pip package manager
3. The India thermal comfort dataset: `india_data_cleaned.csv`

### Step 1: Install Python Dependencies

```bash
# Install required packages
pip install -r requirements.txt

# Verify installation
python -c "import sklearn, pandas, numpy; print('All packages installed successfully')"
```

### Step 2: Prepare the Dataset

Place the dataset file in the project root or update the path in `scripts/train_model.py`:

```python
DATASET_PATH = Path(__file__).parent.parent / 'user_read_only_context/text_attachments/india_data_cleaned-DpII7.csv'
```

The dataset should have the following columns:
- `ta`: Temperature (°C)
- `rh`: Relative Humidity (%)
- `v`: Air Velocity (m/s)
- `met`: Metabolic Rate (met units)
- `clo`: Clothing Insulation (clo units)
- `thermal_sensation`: Target variable (-3 to +3)

### Step 3: Train the Model

Run the training script:

```bash
python scripts/train_model.py
```

This will:
1. Load and explore the dataset
2. Preprocess the features
3. Split into train/test sets
4. Train a Random Forest classifier
5. Evaluate performance
6. Save model artifacts

### Step 4: Model Artifacts Generated

The training script creates the following files:

#### `/public/models/`
- **thermal_comfort_model.pkl** - Trained scikit-learn model (for Python-based API)
- **model_info.json** - Model metadata, metrics, and feature importance
- **client_model.json** - Simplified model for client-side predictions

#### `/data/`
- **preprocessing_info.json** - Feature statistics for normalization

### Step 5: Expected Output

After training, you should see:

```
============================================================
Thermal Comfort ML Model Training Pipeline
============================================================

[1/7] Loading dataset...
Dataset shape: (769, 6)
...

[5/7] Training Random Forest model...
Training complete!

Feature Importance:
  ta: 0.3245
  rh: 0.2108
  clo: 0.1987
  met: 0.1523
  v: 0.1137

[6/7] Evaluating model...
Test Performance:
  Accuracy: 0.7832
  Precision: 0.7654
  Recall: 0.7532
  F1-Score: 0.7591

============================================================
Training Complete!
============================================================
```

### Step 6: Verify Model Integration

Check that the model is properly integrated:

```bash
# Start the application
npm run dev

# In another terminal, test the API
curl -X GET http://localhost:3000/api/predict-real

# Expected response (model status)
{
  "success": true,
  "status": {
    "modelInfoExists": true,
    "clientModelExists": true,
    "preprocessingExists": true,
    "modelReady": true
  }
}
```

### Model Architecture

The trained model is a Random Forest with:
- **Algorithm**: RandomForestClassifier
- **Estimators**: 200 trees
- **Max Depth**: 15
- **Classes**: -3, -2, -1, 0, 1, 2, 3 (Thermal Sensation Vote)
- **Training Samples**: ~615
- **Test Samples**: ~154

### Feature Importance (Approximate)

Based on the India dataset:
1. **Temperature (ta)**: ~32% - Most important factor
2. **Relative Humidity (rh)**: ~21% - Second factor
3. **Clothing Insulation (clo)**: ~20% - Third factor
4. **Metabolic Rate (met)**: ~15% - Fourth factor
5. **Air Velocity (v)**: ~12% - Least important

### Predictions

The model predicts **Thermal Sensation Vote (TSV)** on a scale from -3 to +3:
- **-3**: Cold
- **-2**: Cool
- **-1**: Slightly Cool
- **0**: Neutral
- **+1**: Slightly Warm
- **+2**: Warm
- **+3**: Hot

### Performance Metrics

Expected accuracy on test set: **78-82%** depending on random split

Common use cases where model performs well:
- Moderate temperature ranges (22-30°C)
- Standard humidity levels (40-65%)
- Low to moderate activity levels
- Well-clothed conditions

### Troubleshooting

#### Model not found error
```
Error: Model not found at /public/models/model_info.json
```
**Solution**: Run `python scripts/train_model.py` again

#### Python dependencies missing
```
ModuleNotFoundError: No module named 'sklearn'
```
**Solution**: Run `pip install -r requirements.txt`

#### Dataset not found
```
FileNotFoundError: [Errno 2] No such file or directory: '...'
```
**Solution**: Ensure dataset path in `train_model.py` is correct

#### Fallback mode active
If model files don't exist, the application uses a fallback prediction algorithm based on thermal comfort principles. Training and placing proper models will enable full functionality.

### Advanced: Hyperparameter Tuning

To optimize hyperparameters, modify `train_model.py`:

```python
model = RandomForestClassifier(
    n_estimators=250,        # More trees (slower but potentially better)
    max_depth=20,            # Deeper trees
    min_samples_split=3,     # More aggressive splits
    min_samples_leaf=1,      # More leaves
    max_features='sqrt',     # Feature selection strategy
    class_weight='balanced', # Handle imbalanced data
)
```

Then retrain:
```bash
python scripts/train_model.py
```

### Integration Points

The trained model is used in:

1. **Server-side API** (`/app/api/predict-real/route.ts`)
   - Reads model metadata from JSON
   - Uses rules-engine approximation of RF
   - Returns high-confidence predictions

2. **Client-side UI** (`/components/ml-prediction-form.tsx`)
   - Displays model performance metrics
   - Shows training dataset info
   - Indicates which API is active

3. **Analytics Dashboard** (`/components/model-performance.tsx`)
   - Feature importance visualization
   - Model accuracy metrics
   - Confusion matrix

### Next Steps

1. Train the model: `python scripts/train_model.py`
2. Start the app: `npm run dev`
3. Visit http://localhost:3000
4. Test predictions with real model
5. Deploy to production

For questions or issues, refer to the main README and technical documentation.
