#!/usr/bin/env python3
"""
Thermal Comfort ML Model Training Pipeline
Trains Random Forest model on India thermal comfort dataset
"""

import pandas as pd
import numpy as np
import json
import os
import pickle
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (
    classification_report, confusion_matrix, accuracy_score,
    precision_score, recall_score, f1_score
)
import warnings
warnings.filterwarnings('ignore')

# Configuration
DATASET_PATH = Path(__file__).parent.parent / 'user_read_only_context/text_attachments/india_data_cleaned-DpII7.csv'
MODEL_DIR = Path(__file__).parent.parent / 'public/models'
DATA_DIR = Path(__file__).parent.parent / 'data'
RANDOM_STATE = 42

# Create necessary directories
MODEL_DIR.mkdir(parents=True, exist_ok=True)
DATA_DIR.mkdir(parents=True, exist_ok=True)

def load_data(filepath):
    """Load and validate dataset"""
    print("[1/7] Loading dataset...")
    df = pd.read_csv(filepath)
    print(f"Dataset shape: {df.shape}")
    print(f"Columns: {list(df.columns)}")
    print(f"Data types:\n{df.dtypes}")
    print(f"\nMissing values:\n{df.isnull().sum()}")
    return df

def explore_data(df):
    """Explore and analyze dataset"""
    print("\n[2/7] Exploring data...")
    print(f"\nTarget variable (thermal_sensation) distribution:")
    print(df['thermal_sensation'].value_counts().sort_index())
    print(f"\nBasic statistics:")
    print(df.describe())
    
    # Calculate class distribution
    class_dist = df['thermal_sensation'].value_counts(normalize=True).sort_index()
    print(f"\nClass distribution (%):")
    for cls, pct in class_dist.items():
        print(f"  TSV {cls:+d}: {pct*100:.1f}%")

def preprocess_data(df):
    """Preprocess data"""
    print("\n[3/7] Preprocessing data...")
    
    # Separate features and target
    X = df[['ta', 'rh', 'v', 'met', 'clo']].copy()
    y = df['thermal_sensation'].copy()
    
    print(f"Features shape: {X.shape}")
    print(f"Target shape: {y.shape}")
    print(f"Feature ranges:")
    for col in X.columns:
        print(f"  {col}: [{X[col].min():.2f}, {X[col].max():.2f}]")
    
    return X, y

def split_data(X, y, test_size=0.2, random_state=RANDOM_STATE):
    """Split data into train/test sets"""
    print("\n[4/7] Splitting data...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state, stratify=y
    )
    
    print(f"Training set size: {len(X_train)} ({len(X_train)/len(X)*100:.1f}%)")
    print(f"Test set size: {len(X_test)} ({len(X_test)/len(X)*100:.1f}%)")
    print(f"Training set class distribution:")
    for cls, count in y_train.value_counts().sort_index().items():
        print(f"  TSV {cls:+d}: {count} ({count/len(y_train)*100:.1f}%)")
    
    return X_train, X_test, y_train, y_test

def train_model(X_train, y_train):
    """Train Random Forest model"""
    print("\n[5/7] Training Random Forest model...")
    
    # Hyperparameters tuned for thermal comfort prediction
    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=15,
        min_samples_split=5,
        min_samples_leaf=2,
        max_features='sqrt',
        class_weight='balanced',  # Handle class imbalance
        random_state=RANDOM_STATE,
        n_jobs=-1,
        verbose=1
    )
    
    model.fit(X_train, y_train)
    print("Training complete!")
    
    # Feature importance
    feature_importance = pd.DataFrame({
        'feature': X_train.columns,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print("\nFeature Importance:")
    for idx, row in feature_importance.iterrows():
        print(f"  {row['feature']}: {row['importance']:.4f}")
    
    return model, feature_importance

def evaluate_model(model, X_train, X_test, y_train, y_test):
    """Evaluate model performance"""
    print("\n[6/7] Evaluating model...")
    
    # Training performance
    y_train_pred = model.predict(X_train)
    train_accuracy = accuracy_score(y_train, y_train_pred)
    train_f1 = f1_score(y_train, y_train_pred, average='weighted')
    
    # Test performance
    y_test_pred = model.predict(X_test)
    test_accuracy = accuracy_score(y_test, y_test_pred)
    test_f1 = f1_score(y_test, y_test_pred, average='weighted')
    test_precision = precision_score(y_test, y_test_pred, average='weighted')
    test_recall = recall_score(y_test, y_test_pred, average='weighted')
    
    print(f"\nTraining Performance:")
    print(f"  Accuracy: {train_accuracy:.4f}")
    print(f"  F1-Score (weighted): {train_f1:.4f}")
    
    print(f"\nTest Performance:")
    print(f"  Accuracy: {test_accuracy:.4f}")
    print(f"  Precision: {test_precision:.4f}")
    print(f"  Recall: {test_recall:.4f}")
    print(f"  F1-Score (weighted): {test_f1:.4f}")
    
    print(f"\nConfusion Matrix:")
    cm = confusion_matrix(y_test, y_test_pred)
    print(cm)
    
    print(f"\nClassification Report:")
    print(classification_report(y_test, y_test_pred))
    
    metrics = {
        'train_accuracy': float(train_accuracy),
        'train_f1': float(train_f1),
        'test_accuracy': float(test_accuracy),
        'test_precision': float(test_precision),
        'test_recall': float(test_recall),
        'test_f1': float(test_f1),
        'confusion_matrix': cm.tolist(),
        'total_samples': len(X_test),
        'total_features': X_test.shape[1]
    }
    
    return metrics, y_test_pred

def extract_model_rules(model, X_train, feature_names):
    """Extract rules/insights from model for client-side implementation"""
    print("\nExtracting model structure for client-side use...")
    
    # Get feature importance for weighting
    importances = model.feature_importances_
    feature_importance_dict = {
        name: float(imp) for name, imp in zip(feature_names, importances)
    }
    
    # Get tree information for simplified client model
    trees_info = []
    max_trees = min(10, len(model.estimators_))  # Use first 10 trees for client
    
    for tree_idx, tree in enumerate(model.estimators_[:max_trees]):
        tree_info = {
            'max_depth': int(tree.get_depth()),
            'n_nodes': tree.tree_.node_count,
            'n_leaves': np.sum(tree.tree_.feature == -2)
        }
        trees_info.append(tree_info)
    
    return {
        'feature_importance': feature_importance_dict,
        'n_classes': len(model.classes_),
        'classes': model.classes_.tolist(),
        'n_features': model.n_features_in_,
        'feature_names': feature_names,
        'trees_info': trees_info,
        'total_estimators': len(model.estimators_)
    }

def create_client_model(model, X_train, y_train, feature_names, feature_importance):
    """Create simplified model rules for client-side implementation"""
    print("\nCreating client-side model rules...")
    
    # Calculate class probabilities in training set
    class_counts = pd.Series(y_train).value_counts()
    class_probs = (class_counts / len(y_train)).to_dict()
    
    # Calculate feature statistics for normalization
    feature_stats = {
        'ta': {'mean': float(X_train['ta'].mean()), 'std': float(X_train['ta'].std())},
        'rh': {'mean': float(X_train['rh'].mean()), 'std': float(X_train['rh'].std())},
        'v': {'mean': float(X_train['v'].mean()), 'std': float(X_train['v'].std())},
        'met': {'mean': float(X_train['met'].mean()), 'std': float(X_train['met'].std())},
        'clo': {'mean': float(X_train['clo'].mean()), 'std': float(X_train['clo'].std())}
    }
    
    client_model = {
        'version': '1.0.0',
        'algorithm': 'RandomForest',
        'n_estimators': len(model.estimators_),
        'feature_importance': feature_importance.set_index('feature')['importance'].to_dict(),
        'class_distribution': {int(k): v for k, v in class_probs.items()},
        'feature_stats': feature_stats,
        'classes': sorted(model.classes_.tolist())
    }
    
    return client_model

def save_model(model, model_path):
    """Save trained model"""
    print(f"\nSaving model to {model_path}...")
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    print("Model saved successfully!")

def save_model_info(info_path, model_info, metrics, feature_importance):
    """Save model information as JSON"""
    print(f"Saving model info to {info_path}...")
    
    model_info['metrics'] = metrics
    model_info['feature_importance'] = feature_importance.set_index('feature')['importance'].to_dict()
    
    with open(info_path, 'w') as f:
        json.dump(model_info, f, indent=2)
    print("Model info saved successfully!")

def main():
    """Main training pipeline"""
    print("=" * 60)
    print("Thermal Comfort ML Model Training Pipeline")
    print("=" * 60)
    
    try:
        # Load data
        df = load_data(DATASET_PATH)
        
        # Explore data
        explore_data(df)
        
        # Preprocess
        X, y = preprocess_data(df)
        
        # Split
        X_train, X_test, y_train, y_test = split_data(X, y)
        
        # Train
        model, feature_importance = train_model(X_train, y_train)
        
        # Evaluate
        metrics, y_pred = evaluate_model(model, X_train, X_test, y_train, y_test)
        
        # Extract model info
        model_info = extract_model_rules(model, X_train, X.columns.tolist())
        client_model = create_client_model(model, X_train, y_train, X.columns.tolist(), feature_importance)
        
        # Save artifacts
        model_path = MODEL_DIR / 'thermal_comfort_model.pkl'
        model_info_path = MODEL_DIR / 'model_info.json'
        client_model_path = MODEL_DIR / 'client_model.json'
        
        save_model(model, model_path)
        save_model_info(model_info_path, model_info, metrics, feature_importance)
        
        with open(client_model_path, 'w') as f:
            json.dump(client_model, f, indent=2)
        print(f"Client model saved to {client_model_path}")
        
        # Save preprocessing info
        preprocessing_info = {
            'feature_names': X.columns.tolist(),
            'target_name': 'thermal_sensation',
            'classes': sorted(y.unique().tolist()),
            'scaler_mean': X.mean().to_dict(),
            'scaler_std': X.std().to_dict()
        }
        
        preprocessing_path = DATA_DIR / 'preprocessing_info.json'
        with open(preprocessing_path, 'w') as f:
            json.dump(preprocessing_info, f, indent=2)
        print(f"Preprocessing info saved to {preprocessing_path}")
        
        print("\n" + "=" * 60)
        print("Training Complete!")
        print("=" * 60)
        print(f"\nModel saved to: {model_path}")
        print(f"Model info saved to: {model_info_path}")
        print(f"Client model saved to: {client_model_path}")
        print(f"Preprocessing info saved to: {preprocessing_path}")
        
        return True
        
    except Exception as e:
        print(f"\nError during training: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == '__main__':
    success = main()
    exit(0 if success else 1)
