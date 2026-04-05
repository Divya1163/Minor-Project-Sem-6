# Thermal Comfort Predictor
### Minor Project — Semester 6

An AI-powered web application that predicts **Thermal Comfort** levels based on environmental and personal parameters. Built using **XGBoost Machine Learning**, a **Flask REST API backend**, and a **Next.js frontend**.

---

## 📌 Project Overview

Thermal comfort refers to the condition of mind that expresses satisfaction with the thermal environment. This project predicts the **Thermal Sensation Vote (TSV)** — a 7-class scale from Cold (−3) to Hot (+3) — using 6 input parameters based on the **ASHRAE Standard 55**.

The model is trained on real Indian climate thermal comfort data, making it relevant for tropical and subtropical conditions.

---

## 🧠 Machine Learning Model

| Property | Detail |
|---|---|
| **Algorithm** | XGBoost Classifier |
| **Dataset** | India Thermal Comfort Data (`india_data_cleaned.csv`) |
| **Training Samples** | ~150,000 observations |
| **Features** | 6 (ta, tr, rh, v, met, clo) |
| **Target** | Thermal Sensation Vote (TSV): −3 to +3 |
| **Train/Test Split** | 80% / 20% (stratified) |
| **Saved Model** | `india_xgb_model.pkl` |
| **Saved Scaler** | `india_scaler.pkl` |

### Input Features

| Parameter | Symbol | Unit | Range |
|---|---|---|---|
| Air Temperature | ta | °C | −10 to 55 |
| Mean Radiant Temperature | tr | °C | −10 to 80 |
| Relative Humidity | rh | % | 0 to 100 |
| Air Velocity | v | m/s | 0 to 5 |
| Metabolic Rate | met | met | 0.5 to 5 |
| Clothing Insulation | clo | clo | 0 to 3 |

### Output: Thermal Sensation Vote (TSV)

| TSV | Label | Comfort Category |
|---|---|---|
| −3 | Cold | Very Uncomfortable |
| −2 | Cool | Uncomfortable |
| −1 | Slightly Cool | Slightly Uncomfortable |
| 0 | Neutral | Comfortable ✅ |
| +1 | Slightly Warm | Slightly Uncomfortable |
| +2 | Warm | Uncomfortable |
| +3 | Hot | Very Uncomfortable |

### Model Results
Training results and evaluation charts are saved in the `Results/` folder:
- `Results/confusion_matrix.png` — Per-class prediction accuracy
- `Results/feature_importance.png` — Which features matter most
- `Results/train_vs_test_accuracy.png` — Train vs test accuracy comparison
- `Results/class_distribution.png` — Dataset class balance

---

## 🗂️ Project Structure

```
Minor-Project-Sem-6/
│
├── thermal_comfort_training.ipynb   # ML training notebook (XGBoost)
├── india_data.csv                   # Raw dataset
├── india_data_cleaned.csv           # Cleaned dataset
├── india_xgb_model.pkl              # Trained XGBoost model
├── india_scaler.pkl                 # Feature scaler (StandardScaler)
├── model_info.json                  # Model metadata and accuracy
├── anlytics.ipynb                   # Data analysis notebook
│
├── backend/
│   ├── app.py                       # Flask REST API server
│   └── requirements.txt             # Python dependencies
│
├── app/
│   ├── page.tsx                     # Home — Prediction interface
│   ├── api/predict/route.ts         # Next.js API route → calls Flask
│   ├── model-performance/page.tsx   # ML model metrics page
│   └── analytics/page.tsx           # Analytics dashboard
│
├── components/
│   ├── ml-prediction-form.tsx       # Main prediction form
│   ├── model-performance.tsx        # Model metrics dashboard
│   └── analytics-dashboard.tsx      # Charts and analytics
│
├── lib/
│   ├── ml-model.ts                  # Client-side utilities & validation
│   └── utils.ts                     # Shared utilities
│
├── Results/                         # Model evaluation charts
├── public/                          # Static assets
├── styles/                          # CSS styles
└── requirements.txt                 # Python dependencies
```

---

## 🚀 How to Run the Project

### Prerequisites
- Python 3.9+ with Anaconda (recommended)
- Node.js 18+
- Git

### Step 1 — Clone the Repository
```bash
git clone https://github.com/Divya1163/Minor-Project-Sem-6.git
cd Minor-Project-Sem-6
```

### Step 2 — Start the Flask Backend
Open **Terminal 1**:
```bash
cd backend
pip install flask flask-cors
python app.py
```
Flask API will run at: `http://localhost:5000`

Verify it's working: open `http://localhost:5000/health` in your browser.
Expected response:
```json
{ "model_loaded": true, "scaler_loaded": true, "status": "ready" }
```

### Step 3 — Start the Next.js Frontend
Open **Terminal 2**:
```bash
cd Minor-Project-Sem-6
npm install
npm run dev
```
Frontend will run at: `http://localhost:3000`

### Step 4 — Use the App
Open `http://localhost:3000` in your browser, enter the 6 parameters and click **Predict Comfort**.

---

## 🔁 System Architecture

```
User (Browser)
     │
     ▼
Next.js Frontend (localhost:3000)
     │  enters parameters → clicks Predict
     ▼
Next.js API Route (/api/predict)
     │  forwards request
     ▼
Flask Backend (localhost:5000/predict)
     │  loads model → scales input → predicts
     ▼
XGBoost Model (india_xgb_model.pkl)
     │  returns TSV class
     ▼
Response displayed on Frontend
```

---

## 📓 Training the Model

The complete training pipeline is in `thermal_comfort_training.ipynb`. It covers:

1. Load and explore `india_data_cleaned.csv`
2. Add Mean Radiant Temperature (`tr = ta` approximation for indoor environments)
3. Train/Test split — 80/20 stratified
4. Feature scaling with `StandardScaler`
5. Train XGBoost Classifier (300 estimators, max depth 6)
6. Evaluate — accuracy, classification report, confusion matrix
7. Save model as `india_xgb_model.pkl` and scaler as `india_scaler.pkl`
8. Save result charts to `Results/` folder

To retrain:
```bash
# Open Jupyter
jupyter notebook thermal_comfort_training.ipynb
# Run all cells
```

---

## 🛠️ Tech Stack

### Machine Learning
- Python, XGBoost, scikit-learn, pandas, numpy
- Matplotlib, Seaborn (visualizations)

### Backend
- Flask (REST API)
- Flask-CORS (cross-origin requests)

### Frontend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Recharts (data visualization)

---

## 📊 API Reference

### POST `/predict` (Flask — port 5000)
```json
Request:
{
  "ta": 22, "tr": 22, "rh": 50,
  "v": 0.1, "met": 1.0, "clo": 0.5
}

Response:
{
  "success": true,
  "prediction": {
    "tsv": 0,
    "tsv_label": "Neutral (Comfortable)",
    "comfort_category": "Comfortable",
    "confidence": 0.91,
    "confidence_pct": "91.0%",
    "recommendation": "Conditions are ideal. No changes needed."
  }
}
```

---

## 👥 Team
Minor Project — Semester 6

---

## 📄 License
MIT License
