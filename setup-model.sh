#!/bin/bash

# Thermal Comfort ML Model Setup Script
# This script automates the setup and training of the ML model

set -e  # Exit on error

echo "================================================"
echo "Thermal Comfort ML Model Setup"
echo "================================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    echo "Please install Python 3.8+ from https://www.python.org"
    exit 1
fi

echo "[1/5] Checking Python version..."
PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
echo "Found Python $PYTHON_VERSION"
echo ""

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "Error: pip is not installed"
    echo "Please install pip or use 'python3 -m pip'"
    exit 1
fi

echo "[2/5] Installing Python dependencies..."
pip3 install -r requirements.txt --quiet
echo "Dependencies installed successfully"
echo ""

# Check if dataset exists
DATASET_PATH="user_read_only_context/text_attachments/india_data_cleaned-DpII7.csv"
if [ ! -f "$DATASET_PATH" ]; then
    echo "Warning: Dataset not found at $DATASET_PATH"
    echo "Please ensure the India thermal comfort dataset is in the correct location"
    echo "Continuing anyway - model training may fail"
    echo ""
else
    echo "[3/5] Dataset found: $DATASET_PATH"
    DATASET_SIZE=$(wc -l < "$DATASET_PATH")
    echo "Dataset has $DATASET_SIZE rows"
    echo ""
fi

echo "[4/5] Training ML model..."
echo "This may take 1-2 minutes..."
python3 scripts/train_model.py

if [ $? -eq 0 ]; then
    echo ""
    echo "[5/5] Verifying model artifacts..."
    
    # Check if model files were created
    if [ -f "public/models/model_info.json" ] && [ -f "data/preprocessing_info.json" ]; then
        echo "✓ Model artifacts created successfully"
        echo ""
        echo "================================================"
        echo "Setup Complete!"
        echo "================================================"
        echo ""
        echo "Next steps:"
        echo "1. Start the application: npm run dev"
        echo "2. Open http://localhost:3000 in your browser"
        echo "3. Test predictions with the ML model"
        echo ""
        echo "For more information, see TRAINING_GUIDE.md"
    else
        echo "Warning: Some model files not found"
        echo "Check the training output above for errors"
        exit 1
    fi
else
    echo "Error: Model training failed"
    exit 1
fi
