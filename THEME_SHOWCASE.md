# Modern Theme Showcase

## Color System at a Glance

### Dark Mode Palette

```
┌─────────────────────────────────────────────────────────────┐
│ BACKGROUND LAYER (L0)                                       │
│ #0f0f1e - Deep Navy/Purple (Main viewport background)       │
│ With 135° gradient to deeper blue                           │
└─────────────────────────────────────────────────────────────┘
│
├─ CARD LAYER (L1)
│  #1a1a2e - Slightly lighter navy with gradient
│  Used for cards, containers, sections
│
├─ POPOVER LAYER (L2)
│  #16213e - Deep blue for modals, popovers
│  Creates depth hierarchy
│
└─ MUTED LAYER (L3)
   #2d3748 - Slate for disabled/muted elements
```

## Brand Colors

### Primary - Purple (#7c3aed)
- Button backgrounds
- Link colors
- Navigation highlights
- Focus indicators
- Primary call-to-action

### Accent - Teal (#14b8a6)
- Highlights
- Active states
- Success indicators
- Focus badges
- Data emphasis

### Secondary - Slate (#64748b)
- Secondary buttons
- Supporting text
- Inactive elements

### Destructive - Orange (#f97316)
- Error states
- Delete actions
- Warning indicators
- Danger zone

## Component Examples

### Navigation Bar
```
┌───────────────────────────────────────────────────────────────────┐
│ 🧠 ComfortAI    [Predictor] [ML Model] [Dataset] [Analytics]      │
│ gradient+backdrop-blur  ↑active state with accent+glow            │
└───────────────────────────────────────────────────────────────────┘
```

### Card Component
```
┌─────────────────────────────────────────┐
│ ╭─ Card Title (Foreground #f5f5ff)     │
│ │                                       │
│ │ Card content with gradient background │
│ │ and purple-tinted border              │
│ ╰─────────────────────────────────────┘ │
│ Shadow: 0 12px 24px rgba(124,58,237,0.15)
└─────────────────────────────────────────┘
```

### Button States

**Default (Primary)**
```
┌──────────────────┐
│ Save Changes     │ Background: #7c3aed
│                  │ Text: #f5f5ff
└──────────────────┘ Border: None
```

**Hover**
```
┌──────────────────┐
│ Save Changes     │ Transform: translateY(-2px)
│                  │ Shadow: Enhanced purple glow
└──────────────────┘
```

**Focus**
```
┌──────────────────┐
│ Save Changes     │ Ring: #7c3aed 2px offset
└──────────────────┘
```

**Disabled**
```
┌──────────────────┐
│ Save Changes     │ Opacity: 50%
│                  │ Cursor: not-allowed
└──────────────────┘
```

## Typography with Theme

### Heading (Large)
```
▌Thermal Comfort Predictor
   Color: Gradient (Foreground → Accent)
   Shadow: Subtle purple glow
```

### Body Text
```
▌ Advanced AI-powered system to predict thermal comfort levels...
   Color: #f5f5ff
   Line-height: 1.6
   Letter-spacing: 0
```

### Secondary Text
```
▌ Help text, descriptions, disabled labels
   Color: #a0aec0 (Muted Foreground)
   Font-size: 0.875rem
```

## Chart Color Scheme

```
Series 1: ━━━ Teal (#14b8a6)      - Main data
Series 2: ━━━ Violet (#8b5cf6)    - Comparison
Series 3: ━━━ Cyan (#06b6d4)      - Secondary
Series 4: ━━━ Orange (#f97316)    - Alert/Warning
Series 5: ━━━ Pink (#ec4899)      - Highlight
```

Example visualization:
```
  ┌────────────────────────────────────┐
  │ Temperature Over Time              │
  │  40 ┤       ╱──╲                   │
  │  35 ┤      ╱    ╲──╱╲              │
  │  30 ┤─────╱        ╲─────          │
  │  25 ┤                              │
  │  ┤────────────────────────────────── │
  │   0   Jan   Feb   Mar   Apr   May  │
  │                                    │
  │ ━━ Teal (Primary data series)      │
  │ ━━ Violet (Forecast)               │
  └────────────────────────────────────┘
```

## Interaction Flows

### Link Hover
```
Before: Text #f5f5ff, Underline: none
After:  Text #14b8a6, Underline: appears
        Plus: 4px soft shadow
```

### Form Input Focus
```
Before: Border #2d3748, Background #16213e
After:  Border #7c3aed, Background #16213e
        Plus: 2px ring in primary color
        Plus: Smooth transition 200ms
```

### Navigation Active State
```
Before: Text #a0aec0 (muted)
After:  Text #14b8a6 (accent)
        Plus: bg-accent/10 background
        Plus: Shadow glow effect
        Plus: 200ms transition
```

## Theme Hierarchy

### Visual Weight

```
[Darkest]  #0f0f1e ────────── Least prominent
           #1a1a2e
           #16213e
           #2d3748 ────────── Mid-tone greys
           #64748b
           #a0aec0
           #f5f5ff ────────── Most prominent
[Lightest]
```

## Accessibility Features

### WCAG AA Compliance
- Text on background: 18:1 contrast (AAA)
- Focus indicators: 2px ring at 7:1 contrast
- Disabled states: Clearly distinguishable

### Focus Management
```
┌─────────────────────────┐
│ Button with Focus       │  Purple ring: #7c3aed
│ ◄─ 2px offset, 2px     │  Keyboard navigation
└─────────────────────────┘
```

## Responsive Behavior

The theme adapts smoothly across screen sizes:

```
Mobile (320px)          Tablet (768px)          Desktop (1280px)
┌────────────┐          ┌─────────────────┐     ┌──────────────────────┐
│ ComfortAI  │          │ ComfortAI       │     │ ComfortAI            │
│ [Menu]     │          │ [Nav items]     │     │ [Full Navigation]    │
│            │          │                 │     │                      │
│ [Card]     │          │ [Card]  [Card]  │     │ [Card] [Card] [Card] │
│            │          │                 │     │                      │
│ [Card]     │          │ [Card]  [Card]  │     │ [Card] [Card] [Card] │
└────────────┘          └─────────────────┘     └──────────────────────┘

All with consistent gradient backgrounds and color theme
```

## Animation Palette

### Transitions
- UI State Changes: 200ms cubic-bezier(0.4, 0, 0.2, 1)
- Hover Effects: 300ms cubic-bezier(0.4, 0, 0.2, 1)
- Focus Indicators: 150ms ease-out

### Effects
- Button Lift: translateY(-2px)
- Shadow Expansion: 0 12px 24px rgba(124, 58, 237, 0.15)
- Fade In: opacity 0 → 1

## Summary

The modern theme provides:
✓ Professional dark interface
✓ Purple-teal color harmony
✓ High contrast for readability
✓ Smooth transitions and interactions
✓ Full accessibility compliance
✓ Responsive across all devices
✓ Optimized for thermal comfort analytics
