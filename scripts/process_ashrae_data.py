#!/usr/bin/env python3
"""
ASHRAE Thermal Comfort Data Processing and Model Training
Processes the ASHRAE Global Thermal Comfort Database II
Trains Random Forest model for TSV (Thermal Sensation Vote) prediction
"""

import pandas as pd
import numpy as np
import json
import joblib
from pathlib import Path
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
from typing import Tuple, Dict, Any
import warnings

warnings.filterwarnings('ignore')

# Data parameters
DATA_DIR = Path(__file__).parent / "data"
MODEL_DIR = Path(__file__).parent.parent / "public" / "models"
METRICS_FILE = MODEL_DIR / "model_metrics.json"

# Feature columns from ASHRAE database
ASHRAE_FEATURES = [
    'Ta',  # Air temperature (°C)
    'TR',  # Mean radiant temperature (°C)
    'RH',  # Relative humidity (%)
    'v',   # Air velocity (m/s)
    'Met', # Metabolic rate (met)
    'Clo'  # Clothing insulation level (clo)
]

TSV_MAPPING = {
    -3: 'Cold',
    -2: 'Cool',
    -1: 'Slightly Cool',
    0: 'Neutral',
    1: 'Slightly Warm',
    2: 'Warm',
    3: 'Hot'
}


class ASHRAEDataProcessor:
    """Process ASHRAE thermal comfort data and train models"""
    
    def __init__(self, data_path: str = None):
        """Initialize processor with optional data path"""
        if data_path is None:
            # Try to find the data file
            self.data_path = self._find_data_file()
        else:
            self.data_path = Path(data_path)
        
        self.df = None
        self.X_train = None
        self.X_test = None
        self.y_train = None
        self.y_test = None
        self.scaler = StandardScaler()
        self.model = None
        
    def _find_data_file(self) -> Path:
        """Find ASHRAE data file in data directory"""
        DATA_DIR.mkdir(exist_ok=True)
        
        # Common file names for ASHRAE database
        possible_files = [
            'ASHRAE_DB2.csv',
            'ashrae_db2.csv',
            'ASHRAE-II.csv',
            'thermal_comfort_data.csv'
        ]
        
        for file in possible_files:
            path = DATA_DIR / file
            if path.exists():
                return path
        
        raise FileNotFoundError(
            f"No ASHRAE data file found in {DATA_DIR}. "
            f"Please place data file as one of: {possible_files}"
        )
    
    def load_data(self) -> pd.DataFrame:
        """Load and initial processing of ASHRAE data"""
        print(f"Loading data from {self.data_path}...")
        self.df = pd.read_csv(self.data_path)
        print(f"Loaded {len(self.df)} records with {len(self.df.columns)} columns")
        
        # Display basic info
        print(f"\nColumn names: {list(self.df.columns)[:20]}...")
        print(f"\nData shape: {self.df.shape}")
        print(f"\nData types:\n{self.df.dtypes}")
        
        return self.df
    
    def prepare_features(self) -> Tuple[np.ndarray, np.ndarray]:
        """Prepare features and target for modeling"""
        # Handle different possible column names
        feature_mapping = {
            'Ta': ['Ta', 'ta', 'Air.Temperature', 'air_temperature'],
            'TR': ['TR', 'tr', 'Mean.Radiant.Temp', 'mean_radiant_temperature'],
            'RH': ['RH', 'rh', 'Relative.Humidity', 'relative_humidity'],
            'v': ['v', 'v_', 'Air.velocity', 'air_velocity'],
            'Met': ['Met', 'met', 'Metabolic.Rate', 'metabolic_rate'],
            'Clo': ['Clo', 'clo', 'Clothing', 'clothing_insulation']
        }
        
        # Find available columns
        selected_features = {}
        for standard_name, aliases in feature_mapping.items():
            for alias in aliases:
                if alias in self.df.columns:
                    selected_features[standard_name] = alias
                    break
        
        if not selected_features:
            raise ValueError(f"Could not find required columns. Available: {self.df.columns.tolist()}")
        
        # Find TSV column
        tsv_aliases = ['TSV', 'tsv', 'Thermal.Sensation.Vote', 'thermal_sensation_vote', 'Sensation']
        tsv_col = None
        for alias in tsv_aliases:
            if alias in self.df.columns:
                tsv_col = alias
                break
        
        if tsv_col is None:
            raise ValueError(f"Could not find TSV column. Available: {self.df.columns.tolist()}")
        
        print(f"\nSelected features: {selected_features}")
        print(f"TSV column: {tsv_col}")
        
        # Extract features and target
        X = self.df[[col for col in selected_features.values()]].copy()
        y = self.df[tsv_col].copy()
        
        # Handle missing values
        initial_len = len(X)
        X = X.dropna()
        y = y[X.index]
        print(f"Removed {initial_len - len(X)} rows with missing values")
        
        # Convert TSV to integers if needed
        y = y.astype(int)
        
        print(f"\nFeature statistics:\n{X.describe()}")
        print(f"\nTarget distribution:\n{y.value_counts().sort_index()}")
        
        return X.values, y.values
    
    def split_data(self, test_size: float = 0.2, random_state: int = 42):
        """Split data into train and test sets"""
        X, y = self.prepare_features()
        
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            X, y, test_size=test_size, random_state=random_state, stratify=y
        )
        
        # Scale features
        self.X_train = self.scaler.fit_transform(self.X_train)
        self.X_test = self.scaler.transform(self.X_test)
        
        print(f"\nTrain set: {len(self.X_train)} samples")
        print(f"Test set: {len(self.X_test)} samples")
        print(f"\nTrain target distribution:\n{pd.Series(self.y_train).value_counts().sort_index()}")
    
    def train_model(self) -> RandomForestClassifier:
        """Train Random Forest model"""
        print("\nTraining Random Forest model...")
        
        self.model = RandomForestClassifier(
            n_estimators=200,
            max_depth=20,
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42,
            n_jobs=-1,
            class_weight='balanced'
        )
        
        self.model.fit(self.X_train, self.y_train)
        print("Model training completed!")
        
        return self.model
    
    def evaluate_model(self) -> Dict[str, Any]:
        """Evaluate model performance"""
        if self.model is None:
            raise ValueError("Model not trained yet")
        
        print("\nEvaluating model...")
        
        y_pred_train = self.model.predict(self.X_train)
        y_pred_test = self.model.predict(self.X_test)
        
        train_accuracy = accuracy_score(self.y_train, y_pred_train)
        test_accuracy = accuracy_score(self.y_test, y_pred_test)
        
        print(f"\nTrain Accuracy: {train_accuracy:.4f}")
        print(f"Test Accuracy: {test_accuracy:.4f}")
        
        print(f"\nTest Set Classification Report:")
        print(classification_report(self.y_test, y_pred_test, target_names=[TSV_MAPPING.get(i, f"TSV {i}") for i in sorted(np.unique(self.y_test))]))
        
        # Feature importance
        feature_importance = pd.DataFrame({
            'feature': ASHRAE_FEATURES[:len(self.model.feature_importances_)],
            'importance': self.model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        print(f"\nFeature Importance:\n{feature_importance}")
        
        # Confusion matrix
        cm = confusion_matrix(self.y_test, y_pred_test)
        
        metrics = {
            'train_accuracy': float(train_accuracy),
            'test_accuracy': float(test_accuracy),
            'feature_importance': feature_importance.to_dict('records'),
            'confusion_matrix': cm.tolist(),
            'model_params': {
                'n_estimators': 200,
                'max_depth': 20,
                'algorithm': 'Random Forest'
            }
        }
        
        return metrics
    
    def save_model(self, model_path: str = None, scaler_path: str = None):
        """Save trained model and scaler"""
        if model_path is None:
            MODEL_DIR.mkdir(parents=True, exist_ok=True)
            model_path = MODEL_DIR / "thermal_comfort_model.pkl"
            scaler_path = MODEL_DIR / "thermal_comfort_scaler.pkl"
        
        joblib.dump(self.model, model_path)
        joblib.dump(self.scaler, scaler_path)
        
        print(f"\nModel saved to {model_path}")
        print(f"Scaler saved to {scaler_path}")
    
    def save_metrics(self, metrics: Dict[str, Any]):
        """Save model metrics to JSON"""
        MODEL_DIR.mkdir(parents=True, exist_ok=True)
        with open(METRICS_FILE, 'w') as f:
            json.dump(metrics, f, indent=2)
        print(f"Metrics saved to {METRICS_FILE}")


def main():
    """Main training pipeline"""
    try:
        # Initialize processor
        processor = ASHRAEDataProcessor()
        
        # Load data
        processor.load_data()
        
        # Prepare and split data
        processor.split_data()
        
        # Train model
        processor.train_model()
        
        # Evaluate
        metrics = processor.evaluate_model()
        
        # Save model and metrics
        processor.save_model()
        processor.save_metrics(metrics)
        
        print("\n✓ Training pipeline completed successfully!")
        
    except FileNotFoundError as e:
        print(f"\nError: {e}")
        print("\nTo use this script:")
        print("1. Download ASHRAE Global Thermal Comfort Database II from Kaggle")
        print("2. Place the CSV file in the 'scripts/data' directory")
        print("3. Run this script again")
    except Exception as e:
        print(f"\nError during training: {e}")
        raise


if __name__ == "__main__":
    main()
