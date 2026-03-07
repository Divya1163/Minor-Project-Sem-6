# Layout Reference Guide

## Page Layouts

### Home Page (/)

```
┌─────────────────────────────────────────────────────────┐
│ Navigation Bar                                          │
│ ComfortAI    [Predictor] [Analytics]                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🌡️ Thermal Comfort Predictor                          │
│  Advanced AI-powered system...                         │
│                                                         │
│  ┌──────────────────────────────┬─────────────────────┐
│  │                              │                     │
│  │  Sample Scenarios (2×2)      │  How it works:      │
│  │  ├─ Ideal Office             │  1. Enter params    │
│  │  ├─ Hot Summer               │  2. ML processes    │
│  │  ├─ Cold Winter              │  3. Get prediction  │
│  │  └─ Active Workout           │                     │
│  │                              │  Parameters:        │
│  │  Prediction Form (vertical)  │  • Temperature      │
│  │  ├─ Temperature [========]   │  • Humidity         │
│  │  ├─ Humidity [========]      │  • Air Velocity     │
│  │  ├─ Air Velocity [====]      │  • Met. Rate        │
│  │  ├─ Met. Rate [========]     │  • Clothing         │
│  │  └─ Clothing [========]      │                     │
│  │  [PREDICT COMFORT LEVEL]     │  Model Info:        │
│  │                              │  • Best: Random     │
│  │  Result Card (if shown):     │    Forest           │
│  │  ✓ Comfortable               │  • Accuracy: 85%    │
│  │  THI: 22.5 | Confidence: 85% │                     │
│  └──────────────────────────────┴─────────────────────┘
│                                                         │
├─────────────────────────────────────────────────────────┤
│ Footer: Links | Social | Copyright                     │
└─────────────────────────────────────────────────────────┘
```

### Analytics Page (/analytics)

```
┌─────────────────────────────────────────────────────────┐
│ Navigation Bar                                          │
│ ComfortAI    [Predictor] [Analytics]                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  📊 Analytics Dashboard                                │
│  Comprehensive analysis...                             │
│                                                         │
│  Key Metrics (1×4 grid):                               │
│  ┌──────────┬──────────┬──────────┬──────────┐        │
│  │501       │71.5%     │82.2%     │22-24°C   │        │
│  │Predictions│Comfort  │Accuracy  │Opt. Temp │        │
│  └──────────┴──────────┴──────────┴──────────┘        │
│                                                         │
│  Charts (2×2 grid):                                    │
│  ┌─────────────────────┬──────────────────────┐       │
│  │ Temp vs Comfort     │ Comfort Distribution │       │
│  │ [Stacked Bar Chart] │ [Pie Chart]          │       │
│  ├─────────────────────┼──────────────────────┤       │
│  │ Humidity Distribution│ Feature Importance  │       │
│  │ [Line Chart]        │ [Horizontal Bars]    │       │
│  └─────────────────────┴──────────────────────┘       │
│                                                         │
│  Model Performance (full width):                       │
│  ├─ Logistic Regression  [████████░] 78%             │
│  ├─ Random Forest ⭐      [█████████░] 85%             │
│  └─ XGBoost              [████████░] 82%             │
│                                                         │
│  Key Insights (full width, dark bg):                   │
│  • The optimal temperature range is 22-24°C           │
│  • Temperature is most important (28% importance)     │
│  • Random Forest achieves highest accuracy (85%)      │
│  • 71.5% of predictions indicate comfortable...       │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ Footer: Links | Social | Copyright                     │
└─────────────────────────────────────────────────────────┘
```

## Component Breakdowns

### Prediction Form Component

```
┌──────────────────────────────────────────┐
│ 💡 Try Sample Scenarios                 │
│ ┌─────────────┬──────────────┐           │
│ │ Ideal Office│ Hot Summer   │           │
│ ├─────────────┼──────────────┤           │
│ │ Cold Winter │ Active       │           │
│ │             │ Workout      │           │
│ └─────────────┴──────────────┘           │
│                                          │
│ ⚡ Thermal Parameters                   │
│ ┌──────────────────────────────────────┐ │
│ │ Temperature (°C)                     │ │
│ │ [========================================] 22.0 │
│ │                                        │ │
│ │ Relative Humidity (%)                │ │
│ │ [========================================] 50  │
│ │                                        │ │
│ │ Air Velocity (m/s)                   │ │
│ │ [========================================] 0.10 │
│ │                                        │ │
│ │ Metabolic Rate (met)                 │ │
│ │ [========================================] 1.0  │
│ │                                        │ │
│ │ Clothing Insulation (clo)            │ │
│ │ [========================================] 0.5  │
│ │                                        │ │
│ │ [PREDICT COMFORT LEVEL] [Loading...]  │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ Result (if available):                   │
│ ┌──────────────────────────────────────┐ │
│ │ Prediction Result    [✓ Comfortable] │ │
│ │                                        │ │
│ │ Thermal Humidity Index: 22.5          │ │
│ │ Confidence: 85%                        │ │
│ │ [████████████░░░░░░░░░░░░░] 85%       │ │
│ └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

### Navigation Component

```
┌──────────────────────────────────────────────────────────────┐
│ 🌡️ ComfortAI        [📊 Predictor]  [📈 Analytics]        │
└──────────────────────────────────────────────────────────────┘
```

### Sample Scenarios Component

```
┌─────────────────────────────────────────────┐
│ 💡 Try Sample Scenarios                     │
├─────────────────────────────────────────────┤
│ ┌──────────────────┬──────────────────┐    │
│ │ Ideal Office     │ ✓ Comfortable    │    │
│ │ Comfortable      │                  │    │
│ │ office env...    │                  │    │
│ ├──────────────────┼──────────────────┤    │
│ │ Hot Summer       │ ✗ Uncomfortable  │    │
│ │ Warm day with    │                  │    │
│ │ high humidity... │                  │    │
│ ├──────────────────┼──────────────────┤    │
│ │ Cold Winter      │ ✓ Comfortable    │    │
│ │ Cold temperature │                  │    │
│ │ with warm...     │                  │    │
│ ├──────────────────┼──────────────────┤    │
│ │ Active Workout   │ ✗ Uncomfortable  │    │
│ │ High metabolic   │                  │    │
│ │ activity in...   │                  │    │
│ └──────────────────┴──────────────────┘    │
└─────────────────────────────────────────────┘
```

### Analytics Dashboard - Charts

#### Temperature vs Comfort (Stacked Bar)
```
Chart: Temperature vs Comfort
Comfortable: [Blue bars]
Uncomfortable: [Red bars]

   Frequency
   ↑
   |    ██
   |    ██  ██
   |    ██  ██  ██
   |    ██  ██  ██  ██
   |    ██  ██  ██  ██  ██  ██
   |_______________________________→
      15°C 18°C 21°C 24°C 27°C 30°C
```

#### Comfort Distribution (Pie)
```
Comfortable: 358 (71.5%) [Cyan]
Uncomfortable: 143 (28.5%) [Red]

        ╱━━━━━╲
      ╱         ╲
     │           │
     │   71.5%   │
     │ Comfortable
     │           │
     │  28.5%    │
     │ Uncomfort │
      ╲         ╱
        ╲━━━━━╱
```

#### Humidity Distribution (Line)
```
Count
  ↑
  |        ╱╲
  |       ╱  ╲
  |      ╱    ╲
  |     ╱      ╲
  |    ╱        ╲
  |───────────────
    30% 40% 50% 60% 70% 80%
    Relative Humidity
```

#### Feature Importance (Horizontal Bars)
```
Temperature    [████████████████░░░░░░░] 28%
Humidity       [███████████░░░░░░░░░░░░] 22%
Air Velocity   [██████████░░░░░░░░░░░░░░] 18%
Met. Rate      [████████░░░░░░░░░░░░░░░░] 16%
Clothing       [████████░░░░░░░░░░░░░░░░] 16%
```

### Footer Component

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│ ComfortAI          Navigation        Information   Connect
│ AI-powered         • Predictor       • Docs         [GitHub]
│ thermal comfort    • Analytics       • About        [Email]
│ prediction         ───────────────   ───────────
│                                                          │
├──────────────────────────────────────────────────────────┤
│ © 2026 ComfortAI. All rights reserved.                   │
│                           [Privacy] [Terms]             │
└──────────────────────────────────────────────────────────┘
```

## Responsive Breakpoints

### Mobile (< 768px)

```
┌─────────────────────────┐
│ ComfortAI [≡]           │
├─────────────────────────┤
│                         │
│ 🌡️ Thermal Comfort     │
│ Predictor               │
│                         │
│ [Sample Scenarios]      │
│                         │
│ [Prediction Form]       │
│                         │
│ [Info Cards - Stacked]  │
│                         │
│ [Footer]                │
└─────────────────────────┘
```

### Tablet (768px - 1024px)

```
┌──────────────────────────────────────┐
│ ComfortAI      [Predictor][Analytics]│
├──────────────────────────────────────┤
│                                      │
│ [Form Section] [Info Cards]          │
│ (Side by side)                       │
│                                      │
│ [Charts - 2×2 Grid]                  │
│                                      │
│ [Footer]                             │
└──────────────────────────────────────┘
```

### Desktop (> 1024px)

```
┌────────────────────────────────────────────────────────────┐
│ ComfortAI                  [Predictor] [Analytics]         │
├────────────────────────────────────────────────────────────┤
│                                                            │
│ [Form 2 cols]  [Info Cards 1 col]   Max-width container   │
│ [Form 2 cols]  [Info Cards 1 col]   maintained            │
│                                                            │
│ [Charts - 2×2 Grid with max-width]                        │
│                                                            │
│ [Footer]                                                   │
└────────────────────────────────────────────────────────────┘
```

## Color Usage by Component

### Navigation
- Background: `--background` (dark)
- Text: `--foreground` (light)
- Active Link: `--accent` (cyan)
- Hover: `--foreground/80%`

### Cards
- Background: `--card` (slightly lighter than background)
- Border: `--border` (subtle)
- Text: `--foreground` (light)

### Buttons
- Primary: `--primary` (blue)
- Text: `--primary-foreground` (light)
- Hover: `--primary/90%`

### Status Indicators
- Comfortable: `--accent` (cyan background with opacity)
- Uncomfortable: `--destructive` (red)

### Charts
- Series 1: `--chart-1` (cyan)
- Series 2: `--chart-2` (purple)
- Series 3: `--chart-3` (yellow)
- Series 4: `--chart-4` (red)
- Series 5: `--chart-5` (orange)

## Spacing & Grid

### Base Unit: 4px

```
Padding:     p-4 = 16px, p-6 = 24px, p-8 = 32px
Margin:      m-4 = 16px, m-6 = 24px, m-8 = 32px
Gap:         gap-4 = 16px, gap-6 = 24px, gap-8 = 32px
Border:      border = 1px
Radius:      rounded-lg = 10px (based on --radius)
```

### Typography Sizes

```
Text
h1: text-4xl (36px) - Page headings
h2: text-2xl (24px) - Section headings
h3: text-xl (20px) - Subsections
Body: text-base (16px) - Default
Small: text-sm (14px) - Labels, secondary text
Tiny: text-xs (12px) - Captions, tertiary text
```

## Animation Timings

```
Transitions: 200-300ms (hover states)
Loading: indefinite spin animation
Progress: 500ms ease-out (bars filling)
Hover: opacity and color changes
```

---

**Mobile-First Design**: All layouts start mobile and enhance for larger screens.
**Responsive Grid**: Uses Tailwind's grid system (grid-cols-1, md:grid-cols-2, lg:grid-cols-3)
**Flexible Containers**: Max-width wrapper (max-w-6xl) for desktop centering
