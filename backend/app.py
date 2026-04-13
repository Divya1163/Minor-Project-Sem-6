"""
Thermal Comfort Predictor — Flask Backend
==========================================
Loads the trained XGBoost model and scaler,
exposes a POST /predict endpoint for the Next.js frontend.

Run:
    cd backend
    python app.py

API will be available at: http://localhost:5000
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

# ─────────────────────────────────────────
# Initialize Flask app
# ─────────────────────────────────────────
app = Flask(__name__)
CORS(app)  # Allow requests from Next.js frontend (localhost:3000)

# ─────────────────────────────────────────
# Load model & scaler on startup
# ─────────────────────────────────────────
BASE_DIR   = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH  = os.path.join(BASE_DIR, '..', 'india_xgb_model.pkl')
SCALER_PATH = os.path.join(BASE_DIR, '..', 'india_scaler.pkl')

try:
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
    print("✅ Model loaded successfully:", MODEL_PATH)
except FileNotFoundError:
    print("❌ ERROR: india_xgb_model.pkl not found. Run the training notebook first.")
    model = None

try:
    with open(SCALER_PATH, 'rb') as f:
        scaler = pickle.load(f)
    print("✅ Scaler loaded successfully:", SCALER_PATH)
except FileNotFoundError:
    print("❌ ERROR: india_scaler.pkl not found. Run the training notebook first.")
    scaler = None

# ─────────────────────────────────────────
# TSV label mapping
# ─────────────────────────────────────────
TSV_LABELS = {
    -3: "Cold",
    -2: "Cool",
    -1: "Slightly Cool",
     0: "Neutral (Comfortable)",
     1: "Slightly Warm",
     2: "Warm",
     3: "Hot"
}

COMFORT_CATEGORY = {
    -3: "Very Uncomfortable",
    -2: "Uncomfortable",
    -1: "Slightly Uncomfortable",
     0: "Comfortable",
     1: "Slightly Uncomfortable",
     2: "Uncomfortable",
     3: "Very Uncomfortable"
}

RECOMMENDATIONS = {
    -3: "Increase heating. Add more clothing or raise thermostat temperature.",
    -2: "Consider warming up the space or adding a layer of clothing.",
    -1: "Slightly cool — minor heating adjustment or an extra layer may help.",
     0: "Conditions are ideal. No changes needed.",
     1: "Slightly warm — consider light clothing or a small fan.",
     2: "Too warm — increase ventilation, lower thermostat, or use a fan.",
     3: "Very hot — use air conditioning immediately and reduce activity level."
}

# ─────────────────────────────────────────
# Validation helper
# ─────────────────────────────────────────
VALID_RANGES = {
    'ta':  (-10, 55,  "Air Temperature (°C)"),
    'tr':  (-10, 80,  "Mean Radiant Temperature (°C)"),
    'rh':  (0,   100, "Relative Humidity (%)"),
    'v':   (0,   5,   "Air Velocity (m/s)"),
    'met': (0.5, 5,   "Metabolic Rate (met)"),
    'clo': (0,   3,   "Clothing Insulation (clo)"),
}

def validate_inputs(data):
    errors = []
    for field, (low, high, label) in VALID_RANGES.items():
        if field not in data:
            errors.append(f"Missing field: '{field}' ({label})")
            continue
        try:
            val = float(data[field])
        except (ValueError, TypeError):
            errors.append(f"'{field}' must be a number.")
            continue
        if not (low <= val <= high):
            errors.append(f"{label} must be between {low} and {high}. Got: {val}")
    return errors

# ─────────────────────────────────────────
# Routes
# ─────────────────────────────────────────

@app.route('/', methods=['GET'])
def home():
    """Health check endpoint"""
    return jsonify({
        "status":  "running",
        "message": "Thermal Comfort Predictor API is live.",
        "endpoints": {
            "POST /predict": "Get thermal comfort prediction",
            "GET  /health":  "Check model status"
        }
    })


@app.route('/health', methods=['GET'])
def health():
    """Check if model and scaler are loaded"""
    return jsonify({
        "model_loaded":  model  is not None,
        "scaler_loaded": scaler is not None,
        "status": "ready" if (model and scaler) else "not ready"
    })


@app.route('/predict', methods=['POST'])
def predict():
    """
    Main prediction endpoint.

    Expected JSON body:
    {
        "ta":  22,    // Air Temperature (°C)
        "tr":  22,    // Mean Radiant Temperature (°C)
        "rh":  50,    // Relative Humidity (%)
        "v":   0.1,   // Air Velocity (m/s)
        "met": 1.0,   // Metabolic Rate (met)
        "clo": 0.5    // Clothing Insulation (clo)
    }

    Returns:
    {
        "success": true,
        "prediction": {
            "tsv":             0,
            "tsv_label":       "Neutral (Comfortable)",
            "comfort_category":"Comfortable",
            "confidence":      0.87,
            "recommendation":  "Conditions are ideal. No changes needed.",
            "inputs": { ... }
        }
    }
    """

    # Check model is loaded
    if model is None or scaler is None:
        return jsonify({
            "success": False,
            "error": "Model not loaded. Please run the training notebook first."
        }), 500

    # Parse request body
    data = request.get_json()
    if not data:
        return jsonify({
            "success": False,
            "error": "No JSON body received. Send Content-Type: application/json."
        }), 400

    # Validate inputs
    errors = validate_inputs(data)
    if errors:
        return jsonify({
            "success": False,
            "error": "Invalid input parameters.",
            "details": errors
        }), 422

    # Extract features in the correct order
    ta  = float(data['ta'])
    tr  = float(data['tr'])
    rh  = float(data['rh'])
    v   = float(data['v'])
    met = float(data['met'])
    clo = float(data['clo'])

    features = np.array([[ta, tr, rh, v, met, clo]])

    # Scale features
    features_scaled = scaler.transform(features)

    # Predict — model outputs shifted labels (0–6), convert back to TSV (-3 to +3)
    pred_shifted = int(model.predict(features_scaled)[0])
    tsv = pred_shifted - 3  # convert back to TSV scale

    # Get prediction probabilities for confidence score
    proba = model.predict_proba(features_scaled)[0]
    confidence = round(float(proba[pred_shifted]), 4)

    # Build response
    return jsonify({
        "success": True,
        "prediction": {
            "tsv":              tsv,
            "tsv_label":        TSV_LABELS.get(tsv, "Unknown"),
            "comfort_category": COMFORT_CATEGORY.get(tsv, "Unknown"),
            "confidence":       confidence,
            "confidence_pct":   f"{confidence * 100:.1f}%",
            "recommendation":   RECOMMENDATIONS.get(tsv, ""),
            "inputs": {
                "ta":  ta,
                "tr":  tr,
                "rh":  rh,
                "v":   v,
                "met": met,
                "clo": clo
            }
        }
    })


# ─────────────────────────────────────────
# Run server
# ─────────────────────────────────────────
if __name__ == '__main__':
    print("\n" + "="*50)
    print("  Thermal Comfort Predictor — Flask API")
    print("  Running at: http://localhost:5000")
    print("  Press CTRL+C to stop")
    print("="*50 + "\n")
    app.run(debug=False, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
