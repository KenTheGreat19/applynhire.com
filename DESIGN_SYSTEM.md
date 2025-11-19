# Design System - Color & Component Reference

## Color Palette

### Primary Colors
- **Primary Blue**: `#3b82f6` - Main brand color, used for buttons, links, accents
- **Primary Dark**: `#1e40af` - Darker shade for gradients and hover states
- **Primary Light**: `#dbeafe` - Light shade for backgrounds and highlights

### Accent Colors
- **Secondary Purple**: `#8b5cf6` - Used for gradient transitions
- **Accent Cyan**: `#06b6d4` - Additional accent option
- **Success Green**: `#10b981` - Salary highlights and positive indicators
- **Warning Orange**: `#f59e0b` - Alerts and warnings
- **Danger Red**: `#ef4444` - Errors and destructive actions

### Neutral Colors
- **Text Primary**: `#0f172a` - Main text color (very dark blue)
- **Text Secondary**: `#475569` - Secondary text, labels
- **Text Light**: `#64748b` - Tertiary text, muted information
- **Background Light**: `#f8fafc` - Light background
- **Background Lighter**: `#f1f5f9` - Extra light background
- **Background White**: `#ffffff` - Pure white
- **Border Color**: `#e2e8f0` - Standard borders
- **Border Light**: `#cbd5e1` - Lighter borders

## Shadow System

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);     /* Subtle elevation */
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);    /* Card/box shadows */
--shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.1);    /* Modal backgrounds */
--shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.15);   /* Focus/important elements */
```

## Component Styling

### Header
- **Background**: Gradient `linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)`
- **Text Color**: White
- **Padding**: `1rem 0`
- **Position**: Sticky, z-index: 1000

### Search Section
- **Background**: White (`#ffffff`)
- **Padding**: `3rem 2rem`
- **Border Radius**: `16px`
- **Shadow**: `var(--shadow-lg)`
- **Margin**: `2.5rem 0`

### Job Cards
- **Background**: White
- **Border Radius**: `12px`
- **Padding**: `1.75rem`
- **Shadow**: `var(--shadow-sm)` → `var(--shadow-lg)` on hover
- **Transition**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- **Top Border**: Gradient accent bar (4px) on hover

### Buttons

#### Primary Button
- **Background**: Gradient `linear-gradient(135deg, #3b82f6, #2563eb)`
- **Color**: White
- **Padding**: `12px 16px`
- **Border Radius**: `10px`
- **Font Weight**: 700

#### Secondary Button
- **Background**: `#f8fafc`
- **Border**: `2px solid #e2e8f0`
- **Color**: `#0f172a`
- **Padding**: `10px 14px`
- **Border Radius**: `10px`

### Tags
- **Background**: `linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.08))`
- **Border**: `1px solid rgba(59, 130, 246, 0.2)`
- **Border Radius**: `20px`
- **Color**: `#3b82f6`
- **Padding**: `0.4rem 1rem`
- **Font Size**: `0.85rem`

## Typography

### Font Family
- Primary: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Font Sizes & Weights
- **H1 / Page Title**: `2rem` - Weight 800
- **H2 / Section Title**: `1.35rem` - Weight 700
- **H3 / Subsection**: `1.3rem` - Weight 700
- **Body Large**: `1.05rem` - Weight 500
- **Body Standard**: `1rem` - Weight 400/500
- **Body Small**: `0.95rem` - Weight 400
- **Label**: `0.9rem` - Weight 600
- **Caption**: `0.85rem` - Weight 500

## Spacing Scale

```
0.25rem (4px)
0.5rem (8px)
0.75rem (12px)
1rem (16px)
1.25rem (20px)
1.5rem (24px)
1.75rem (28px)
2rem (32px)
2.5rem (40px)
3rem (48px)
4rem (64px)
```

## Border Radius

- **Small Elements**: `8px` (inputs, buttons)
- **Medium Elements**: `10px` (cards, modals)
- **Large Elements**: `12px-16px` (sections)
- **Full Circle**: `50%` (avatars, badges)

## Breakpoints

- **Desktop**: `1024px` and above
- **Tablet**: `768px` to `1023px`
- **Mobile**: Below `480px`

## Transitions

### Standard Transition
```css
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Animation Durations
- **Quick**: `0.15s` - Immediate feedback
- **Standard**: `0.3s` - Default transitions
- **Slow**: `0.6s` - Page load animations

## Interactive States

### Hover
- Cards: `translateY(-8px)` with enhanced shadow
- Buttons: `translateY(-2px)` with brightness filter
- Links: Color change with underline

### Focus
- Border color changes to primary color
- Box-shadow: `0 0 0 4px rgba(59, 130, 246, 0.1)`

### Active
- Buttons: `translateY(0)` (pressed effect)
- Press feedback with slight scale change

## Gradients

### Primary Gradient
```css
linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)
```

### Success Gradient
```css
linear-gradient(135deg, #10b981, #059669)
```

### Footer Gradient
```css
linear-gradient(135deg, #0f172a, #1e293b)
```

## Z-Index Scale

- **Default**: Auto (0)
- **Header**: 1000
- **Modal**: 1001
- **Mobile Menu**: 1000

## Responsive Considerations

- **Min Width**: 320px (small phones)
- **Max Width Container**: 1200px
- **Padding**: 15-20px on mobile, 20px on desktop
- **Touch Targets**: Minimum 44px × 44px
- **Font Size on Mobile**: 16px for inputs (prevents auto-zoom)

---

## Usage Examples

### Creating a New Component

```css
.new-component {
    background: var(--bg-white);
    border-radius: 12px;
    padding: 1.75rem;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-color);
    transition: var(--transition);
}

.new-component:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}
```

### Creating Text Styles

```css
.heading-large {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.3;
}

.text-secondary {
    font-size: 0.95rem;
    color: var(--text-secondary);
    font-weight: 500;
}
```

---

**Last Updated**: November 2025
**Design System Version**: 1.0
