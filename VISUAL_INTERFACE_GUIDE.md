# Visual Interface Guide - India Dataset Migration

## Application Structure

```
ComfortAI (Logo + Brand)
└── Navigation Menu
    ├── Predictor (Home)
    ├── ML Model (Performance + Comparison)
    ├── Dataset (NEW - Comparison Page)
    └── Analytics
```

## Page Layouts

### Home Page (/)

```
┌─────────────────────────────────────────────────────────┐
│  Navigation: Predictor | ML Model | Dataset | Analytics  │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │ 🔵 India Dataset Status Banner                   │   │
│  │ • 769 observations, 78.3% accuracy               │   │
│  │ • View dataset differences →                     │   │
│  └──────────────────────────────────────────────────┘   │
│                                                           │
│  🧠 Thermal Comfort Predictor                            │
│  Advanced AI-powered system optimized for Indian         │
│  climate conditions...                                    │
│                                                           │
│  ⚡ Hybrid deployment  🧠 Real ML predictions           │
│  🟢 India-specific accuracy                              │
│                                                           │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────────────┐  ┌────────────────────────┐  │
│  │                      │  │  India Dataset Active  │  │
│  │                      │  │                        │  │
│  │  Prediction Form     │  │  • Observations: 769  │  │
│  │                      │  │  • Accuracy: 78.3%    │  │
│  │  [Temperature Input] │  │  • Climate: Tropical  │  │
│  │  [Humidity Input]    │  │  • Temp: 25-30°C      │  │
│  │  [Velocity Input]    │  │                        │  │
│  │  [Met Rate Input]    │  ├────────────────────────┤  │
│  │  [Clothing Input]    │  │                        │  │
│  │  [Predict Button]    │  │  How it works          │  │
│  │                      │  │  1. Enter parameters  │  │
│  │  Results:            │  │  2. ML models process │  │
│  │  • TSV: 0            │  │  3. Get prediction    │  │
│  │  • Category: Neutral │  │                        │  │
│  │  • Confidence: 82%   │  ├────────────────────────┤  │
│  │                      │  │                        │  │
│  └──────────────────────┘  │  Parameters Explained  │  │
│                            │  • Temperature: °C     │  │
│                            │  • Humidity: %         │  │
│                            │  • Velocity: m/s       │  │
│                            │  • Met Rate: level     │  │
│                            │  • Clothing: clo       │  │
│                            │                        │  │
│                            └────────────────────────┘  │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Dataset Comparison Page (/dataset-comparison)

```
┌──────────────────────────────────────────────────────────────┐
│  Navigation: Predictor | ML Model | Dataset | Analytics      │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  💾 Dataset Comparison                                        │
│  Understand differences between India dataset and global      │
│  ASHRAE database...                                            │
│                                                                │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────┐   │
│  │ Active Model    │  │ Previous Model  │  │ Focus Area │   │
│  │ India Dataset   │  │ ASHRAE Database │  │ Tropical   │   │
│  │ 769 obs         │  │ 20,000+ obs     │  │ India      │   │
│  └─────────────────┘  └─────────────────┘  └────────────┘   │
│                                                                │
├──────────────────────────────────────────────────────────────┤
│                          Detailed Metrics                     │
│  ┌────────────────────┬──────────┬──────────┬────────────┐   │
│  │ Metric             │ India    │ ASHRAE   │ Difference │   │
│  ├────────────────────┼──────────┼──────────┼────────────┤   │
│  │ Sample Size        │ 769      │ 20,000+  │ Focused    │   │
│  │ Geographic         │ India    │ 60+ ctry │ Localized  │   │
│  │ Temperature Range  │ 25-30°C  │ 15-35°C  │ Warmer     │   │
│  │ Humidity Range     │ 50-65%   │ 20-90%   │ Tropical   │   │
│  │ Velocity Range     │ 0-0.6    │ 0-2.0    │ Lower wind │   │
│  │ Climate Type       │ Tropical │ Mixed    │ Specific   │   │
│  └────────────────────┴──────────┴──────────┴────────────┘   │
│                                                                │
├──────────────────────────────────────────────────────────────┤
│                    [ Temperature Distribution ]               │
│  ┌──────────────────────────────────────────────────────┐    │
│  │                  📊 Bar Chart                        │    │
│  │  ▯ India Dataset (Cyan) - Concentrated 26-28°C      │    │
│  │  ░ ASHRAE (Grey) - Wide spread across range         │    │
│  │                                                       │    │
│  │  India: Concentrated in warmer range (25-28°C)      │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                                │
├──────────────────────────────────────────────────────────────┤
│               [ Thermal Sensation Distribution ]              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │                  📊 Bar Chart                        │    │
│  │  ▯ India: Higher neutral (45% vs 35%)               │    │
│  │  ░ ASHRAE: More diverse distribution                │    │
│  │                                                       │    │
│  │  Key Insight: Cultural adaptation to warm climate   │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                                │
├──────────────────────────────────────────────────────────────┤
│                    Why India Dataset Matters                  │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ ✓ Localized Accuracy: 78.3% for India conditions    │    │
│  │ ✓ Tropical Focus: Warm, humid conditions            │    │
│  │ ✓ Cultural Context: Indian comfort preferences      │    │
│  │ ✓ Building Design: Better for Indian buildings      │    │
│  │ ✓ Practical Range: 25-30°C, no extremes             │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                                │
├──────────────────────────────────────────────────────────────┤
│                  Current Model Details                        │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────┐ ┌─────────┐ │
│  │ Algorithm:  │  │ Accuracy:   │  │ Samples: │ │Dataset: │ │
│  │ Random Forest│  │ 78.3%       │  │ 154      │ │ India   │ │
│  └─────────────┘  └─────────────┘  └──────────┘ └─────────┘ │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

### Model Performance Page (/model-performance)

```
┌──────────────────────────────────────────────────────────────┐
│  Navigation: Predictor | ML Model | Dataset | Analytics      │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  [Model Performance Dashboard - Existing Content]             │
│                                                                │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  Model Comparison                                             │
│  Compare the India-specific model with global ASHRAE model    │
│                                                                │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────────────┐    ┌──────────────────────┐        │
│  │ India Model          │    │ ASHRAE Model         │        │
│  │ [Active Badge]       │    │ [Legacy Badge]       │        │
│  │                      │    │                      │        │
│  │ India Dataset        │    │ ASHRAE Database II   │        │
│  │                      │    │                      │        │
│  │ ┌──────────────────┐ │    │ ┌──────────────────┐ │        │
│  │ │ Accuracy  78.3%  │ │    │ │ Accuracy  76.2%  │ │        │
│  │ │ Precision 76.54% │ │    │ │ Precision 74.8%  │ │        │
│  │ │ F1 Score  75.91% │ │    │ │ F1 Score  73.5%  │ │        │
│  │ │ Samples   154    │ │    │ │ Samples   5000   │ │        │
│  │ └──────────────────┘ │    │ └──────────────────┘ │        │
│  │                      │    │                      │        │
│  │ Training: ~2 min     │    │ Training: ~5 min     │        │
│  │                      │    │                      │        │
│  │ Features:            │    │ Features:            │        │
│  │ • Temperature (ta)   │    │ • Temperature (ta)   │        │
│  │ • Humidity (rh)      │    │ • Humidity (rh)      │        │
│  │ • Velocity (v)       │    │ • Velocity (v)       │        │
│  │ • Met Rate (met)     │    │ • Met Rate (met)     │        │
│  │ • Clothing (clo)     │    │ • Clothing (clo)     │        │
│  │                      │    │                      │        │
│  │ ✓ Advantages:        │    │ ✓ Advantages:        │        │
│  │ • Optimized for India│    │ • Global coverage    │        │
│  │ • High accuracy      │    │ • Large dataset      │        │
│  │ • Tropical focus     │    │ • Wide range         │        │
│  │ • Faster model       │    │ • Industry standard  │        │
│  │ • Cultural context   │    │                      │        │
│  │                      │    │                      │        │
│  │ ⚠ Limitations:       │    │ ⚠ Limitations:       │        │
│  │ • Regional bias      │    │ • Less accurate India│        │
│  │ • Smaller data       │    │ • Average performer  │        │
│  │ • Extreme climates   │    │ • Not optimized      │        │
│  │                      │    │                      │        │
│  └──────────────────────┘    └──────────────────────┘        │
│                                                                │
├──────────────────────────────────────────────────────────────┤
│               Why We Switched to India Dataset                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ Localization │  │ Accuracy     │  │ Cultural     │        │
│  │              │  │              │  │ Context      │        │
│  │ Tailored for │  │ 2.1% higher  │  │ Reflects     │        │
│  │ tropics      │  │ accuracy for │  │ Indian       │        │
│  │              │  │ India        │  │ preferences  │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── Layout
│   ├── Navigation
│   │   ├── Link: / (Predictor)
│   │   ├── Link: /model-performance (ML Model)
│   │   ├── Link: /dataset-comparison (Dataset) ← NEW
│   │   └── Link: /analytics (Analytics)
│   │
│   ├── Main Content
│   │   ├── Home Route (/)
│   │   │   ├── India Dataset Banner ← NEW
│   │   │   ├── Hero Section ← UPDATED
│   │   │   ├── Grid Layout
│   │   │   │   ├── MLPredictionForm (2/3 width)
│   │   │   │   └── Info Cards (1/3 width)
│   │   │   │       ├── India Dataset Card ← NEW
│   │   │   │       ├── How it Works Card
│   │   │   │       └── Parameters Card
│   │   │   │
│   │   ├── Dataset Route (/dataset-comparison) ← NEW
│   │   │   ├── DatasetComparison Component ← NEW
│   │   │   │   ├── Metrics Grid
│   │   │   │   ├── Comparison Table
│   │   │   │   ├── Tabs
│   │   │   │   │   ├── Temperature Distribution
│   │   │   │   │   └── Comfort Distribution
│   │   │   │   ├── Key Differences
│   │   │   │   └── Model Information
│   │   │   │
│   │   ├── Model Route (/model-performance)
│   │   │   ├── ModelPerformance Component
│   │   │   └── ModelComparison Component ← NEW
│   │   │       ├── Model Cards
│   │   │       ├── Comparison Summary
│   │   │       └── Why We Switched
│   │   │
│   │   └── Analytics Route (/analytics)
│   │       └── AnalyticsDashboard Component
│   │
│   └── Footer
```

## Color & Visual Hierarchy

### Home Page Banner
```
┌─ Accent Color (#00d9ff) Background
├─ Title: "Now Running: India Thermal Comfort Dataset"
├─ Description: Key stats and explanation
└─ CTA: "View dataset differences →"
```

### Dataset Info Card
```
┌─ Accent/20 Background
├─ Title: "India Dataset Active"
├─ Metrics:
│  ├─ Observations: 769
│  ├─ Accuracy: 78.3% (Accent Color)
│  ├─ Climate: Tropical/Subtropical
│  └─ Temp Range: 25-30°C
└─ Border: Accent/30
```

### Comparison Cards
```
Active Model (India):          Legacy Model (ASHRAE):
┌─ Accent Badge                ┌─ Outline Badge
├─ Title (Cyan)                ├─ Title (Grey)
├─ Dataset name                ├─ Dataset name
├─ Metrics (Accent color)      ├─ Metrics (Grey color)
├─ Features list               ├─ Features list
├─ ✓ Green checkmarks          ├─ ✓ Green checkmarks
├─ ⚠ Orange warnings           ├─ ⚠ Orange warnings
└─ Border: Accent              └─ Border: Muted
```

## Interactive Elements

### Charts
```
Temperature Distribution:
- Bar Chart (Recharts)
- X-axis: Temperature bins
- Y-axis: Observations
- Series: India (Cyan) vs ASHRAE (Grey)
- Tooltip: On hover

Thermal Sensation Distribution:
- Bar Chart (Recharts)
- X-axis: Comfort categories
- Y-axis: Percentage
- Series: India (Cyan) vs ASHRAE (Grey)
- Tooltip: On hover
```

### Tabs
```
Dataset Comparison Page has 2 tabs:
1. Temperature Distribution
   └─ Bar chart comparing temp ranges

2. Thermal Sensation Distribution
   └─ Bar chart comparing comfort categories
```

## Responsive Breakpoints

### Mobile (<768px)
```
Navigation:
├─ Single row, smaller font
├─ Icons with labels hidden
└─ Hamburger menu (if needed)

Home Page:
├─ Banner full width
├─ Single column layout
├─ Form above info cards
└─ Cards stacked

Dataset Page:
├─ Banner full width
├─ Table scrollable
├─ Single tab visible
└─ Charts responsive
```

### Tablet (768-1024px)
```
Navigation:
├─ Full menu visible
└─ Icons + labels

Layout:
├─ 2-column for main content
└─ Adjusted spacing

Charts:
├─ Medium size
└─ All visible
```

### Desktop (1024px+)
```
Navigation:
├─ Full menu visible
├─ Icons + labels
└─ All spacing optimal

Layout:
├─ 3-column for main
├─ Optimal spacing
└─ All features visible

Charts:
├─ Full size
├─ All details visible
└─ Maximum readability
```

## Data Flow

```
User Visits Home (/)
    ↓
Sees India Dataset Banner
    ↓
[Click Banner or "View differences"]
    ↓
Navigate to /dataset-comparison
    ↓
View Detailed Comparison
├─ Metrics Table
├─ Distribution Charts
├─ Use Cases
└─ Model Information
    ↓
[Optionally: Go to /model-performance]
    ↓
View Model Comparison
├─ India Model Details
├─ ASHRAE Model Details
├─ Performance Metrics
└─ Why We Switched
    ↓
[Try predictions on home page]
    ↓
Get India Model Predictions
```

## Color Palette Reference

```
Primary (Accent):     #00d9ff (Cyan)
Primary Foreground:   #000000 (Black)

Background:           #1a1a2e (Very Dark)
Foreground:           #e0e0ff (Light Grey)

Card:                 #252540 (Dark)
Card Foreground:      #e0e0ff (Light Grey)

Muted:                #3a3a50 (Medium Dark)
Muted Foreground:     #a0a0b0 (Grey)

Accent:               #00d9ff (Cyan)
Accent Foreground:    #1a1a2e (Dark)

Border:               #3a3a50 (Medium Dark)
```

---

This visual guide shows how all the new components fit together in the redesigned interface highlighting the India dataset migration.
