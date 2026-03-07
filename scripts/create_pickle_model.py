#!/usr/bin/env python3
"""
Create and export a trained Random Forest model to pickle format (v4)
This script trains on the India thermal comfort dataset and exports the model
"""

import pickle
import pandas as pd
import numpy as np
from pathlib import Path
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

def load_india_dataset(csv_path):
    """Load the India thermal comfort dataset"""
    df = pd.read_csv(csv_path)
    print(f"Loaded dataset with shape: {df.shape}")
    print(f"Columns: {df.columns.tolist()}")
    return df

def prepare_data(df):
    """Prepare features and target from dataset"""
    # Features for the model
    feature_columns = ['ta', 'rh', 'v', 'met', 'clo']
    
    # Check which columns exist in the dataset
    available_features = [col for col in feature_columns if col in df.columns]
    print(f"Using features: {available_features}")
    
    # Handle missing features with defaults
    for col in feature_columns:
        if col not in df.columns:
            if col == 'ta':
                df[col] = 25  # Default temp
            elif col == 'rh':
                df[col] = 50  # Default humidity
            elif col == 'v':
                df[col] = 0.1  # Default velocity
            elif col == 'met':
                df[col] = 1.0  # Default metabolic rate
            elif col == 'clo':
                df[col] = 0.5  # Default clothing
    
    X = df[feature_columns].values
    
    # Target: Thermal Sensation Vote - look for TSV or similar column
    target_col = None
    for col in df.columns:
        if 'tsv' in col.lower() or 'thermal_sensation' in col.lower():
            target_col = col
            break
    
    if target_col is None:
        # Default: use first non-feature column that looks like a TSV
        for col in df.columns:
            if col not in feature_columns and df[col].dtype in ['int64', 'float64']:
                target_col = col
                break
    
    if target_col is None:
        raise ValueError("Could not find TSV column in dataset")
    
    print(f"Using target column: {target_col}")
    y = df[target_col].values.astype(int)
    
    # Quantize TSV to -2, -1, 0, 1, 2 categories
    y_quantized = np.clip(np.round(y), -3, 3).astype(int)
    
    return X, y_quantized, feature_columns

def train_model(X, y):
    """Train Random Forest classifier"""
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Normalize features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train model
    print("Training Random Forest model...")
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=15,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42,
        n_jobs=-1
    )
    model.fit(X_train_scaled, y_train)
    
    # Evaluate
    y_pred = model.predict(X_test_scaled)
    
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted', zero_division=0)
    recall = recall_score(y_test, y_pred, average='weighted', zero_division=0)
    f1 = f1_score(y_test, y_pred, average='weighted', zero_division=0)
    
    print(f"\nModel Performance:")
    print(f"  Accuracy:  {accuracy:.4f}")
    print(f"  Precision: {precision:.4f}")
    print(f"  Recall:    {recall:.4f}")
    print(f"  F1-Score:  {f1:.4f}")
    
    # Feature importance
    feature_importance = dict(zip(
        ['ta', 'rh', 'v', 'met', 'clo'],
        model.feature_importances_
    ))
    print(f"\nFeature Importance:")
    for feat, imp in sorted(feature_importance.items(), key=lambda x: x[1], reverse=True):
        print(f"  {feat}: {imp:.4f}")
    
    return model, scaler, {
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall,
        'f1': f1,
        'feature_importance': feature_importance,
        'classes': model.classes_.tolist()
    }

def save_pickle_model(model, scaler, metadata, output_path):
    """Save model to pickle file (protocol v4)"""
    model_package = {
        'model': model,
        'scaler': scaler,
        'metadata': metadata,
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
    
    with open(output_path, 'wb') as f:
        pickle.dump(model_package, f, protocol=4)
    
    print(f"\nModel saved to: {output_path}")
    print(f"File size: {Path(output_path).stat().st_size / 1024:.2f} KB")

def main():
    # Paths
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    csv_path = project_root / 'user_read_only_context' / 'text_attachments' / 'india_data_cleaned-DpII7.csv'
    output_path = project_root / 'public' / 'models' / 'thermal_comfort_model_v4.pkl'
    
    # Create output directory
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    if not csv_path.exists():
        print(f"Error: Dataset not found at {csv_path}")
        return
    
    print("=" * 60)
    print("Training Thermal Comfort Prediction Model")
    print("=" * 60)
    
    # Load and prepare data
    df = load_india_dataset(csv_path)
    X, y, features = prepare_data(df)
    
    print(f"Dataset shape: {X.shape}")
    print(f"Classes: {np.unique(y)}")
    print(f"Class distribution: {np.bincount(y + 3)}")  # Shift for proper indexing
    
    # Train model
    model, scaler, metadata = train_model(X, y)
    
    # Save to pickle
    save_pickle_model(model, scaler, metadata, output_path)
    
    print("\n" + "=" * 60)
    print("Model successfully created and exported!")
    print("=" * 60)

if __name__ == '__main__':
    main()
