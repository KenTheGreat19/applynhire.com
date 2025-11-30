# Enterprise Frontend Architecture - ApplyNHire

## 🎯 Overview

This document outlines the enterprise-level frontend architecture refactor for ApplyNHire, focusing on modern UI/UX, clean code principles, accessibility, and performance.

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Design System](#design-system)
- [Component Architecture](#component-architecture)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Development Guide](#development-guide)

## 🏗️ Architecture Overview

### **Technology Stack**

- **TypeScript**: Type-safe JavaScript with strict mode enabled
- **CSS**: Modern CSS with Cascade Layers, Custom Properties, and Container Queries
- **Architecture Pattern**: Component-based with service layer abstraction
- **Build System**: Native TypeScript compilation

### **Project Structure**

```
src/
├── components/          # Reusable UI components
│   ├── base.component.ts
│   ├── header.component.ts
│   └── job-card.component.ts
├── services/           # Business logic layer
│   ├── http.service.ts
│   ├── job.service.ts
│   └── storage.service.ts
├── utils/              # Pure utility functions
│   └── helpers.ts
├── config/             # Configuration constants
│   └── constants.ts
├── types/              # TypeScript type definitions
│   └── index.ts
└── styles/             # CSS architecture
    ├── design-tokens.css
    ├── base.css
    ├── layout.css
    ├── components.css
    └── main.css
```

## 🎨 Design System

### **Design Tokens**

All design values are centralized in `design-tokens.css` using CSS Custom Properties:

#### Color System
- **Brand Colors**: Primary (Blue) and Secondary (Purple) with 10-step scales
- **Semantic Colors**: Success, Warning, Error, Info
- **Neutral Scale**: 11-step grayscale from white to near-black
- **Dark Mode**: Automatic theme switching with optimized values

```css
/* Light Theme */
--color-primary: var(--color-brand-primary-600);
--color-text-primary: var(--color-neutral-900);
--color-bg-primary: var(--color-neutral-0);

/* Dark Theme */
--color-text-primary: var(--color-neutral-50);
--color-bg-primary: var(--color-neutral-950);
```

#### Typography
- **Font Family**: Inter with system font fallbacks
- **Fluid Typography**: Responsive font sizes using `clamp()`
- **Font Weights**: 300-800 scale
- **Line Heights**: Tight, snug, normal, relaxed, loose

```css
--font-size-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--font-size-xl: clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem);
```

#### Spacing
- **8px Grid System**: Consistent spacing from 4px to 128px
- **Responsive Sections**: Automatic padding adjustment

```css
--space-4: 1rem;    /* 16px */
--space-8: 2rem;    /* 32px */
--space-16: 4rem;   /* 64px */
```

#### Shadows & Elevation
- **6-Level Shadow System**: From subtle to dramatic
- **Focus Shadows**: Accessible focus indicators
- **Dark Mode Adjustments**: Softer shadows in dark theme

### **CSS Architecture**

#### Cascade Layers
Organized specificity using `@layer`:

```css
@layer tokens;      /* Design tokens */
@layer base;        /* Reset & defaults */
@layer layout;      /* Layout primitives */
@layer components;  /* UI components */
@layer site;        /* Site-specific styles */
```

#### Utility Classes
- **Layout**: Grid, Flex, Stack layouts
- **Spacing**: Margin and padding utilities
- **Typography**: Font size, weight utilities
- **Responsive**: Mobile-first breakpoint utilities

## 🧩 Component Architecture

### **Base Component Class**

All components extend `Component` base class:

```typescript
export abstract class Component {
  protected el: HTMLElement;
  protected abstract init(): void;
  
  // Lifecycle methods
  protected addEventListener();
  protected emit();
  destroy();
}
```

### **Component Features**

1. **Encapsulation**: Components manage their own state and behavior
2. **Event Management**: Automatic cleanup on destroy
3. **Type Safety**: Full TypeScript typing
4. **Lifecycle Hooks**: init, mounted, unmounted

### **Example: Header Component**

```typescript
export class HeaderComponent extends Component {
  private themeToggle: HTMLButtonElement;
  
  protected init(): void {
    this.setupElements();
    this.initTheme();
    this.setupEventListeners();
  }
  
  private handleThemeToggle(): void {
    // Theme switching logic
  }
}
```

## ♿ Accessibility (WCAG 2.1 AA)

### **Semantic HTML**
- Proper heading hierarchy (h1-h6)
- Landmark regions (header, main, footer, nav)
- List elements for navigation and content groups

### **ARIA Attributes**
```html
<button 
  aria-expanded="false" 
  aria-controls="mobileMenu"
  aria-label="Open navigation menu">
</button>

<div 
  role="dialog" 
  aria-modal="true" 
  aria-labelledby="modalTitle">
</div>
```

### **Keyboard Navigation**
- **Tab Order**: Logical focus flow
- **Escape Key**: Closes modals and dropdowns
- **Arrow Keys**: Navigate through menus
- **Enter/Space**: Activates buttons

### **Focus Management**
```css
.btn:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

/* Focus shadows for inputs */
.input:focus {
  box-shadow: var(--shadow-focus-primary);
}
```

### **Screen Reader Support**
- `.sr-only` class for screen reader only content
- Descriptive button labels
- Status announcements for dynamic content
- Alt text for images

### **Color Contrast**
- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio
- **Interactive Elements**: Clear visual differentiation
- **Dark Mode**: Optimized for reduced eye strain

## ⚡ Performance

### **CSS Performance**

#### CSS Containment
```css
.job-card {
  contain: layout style paint;
}
```

#### Will-Change Optimization
```css
.btn:hover {
  will-change: transform;
}
```

#### Font Loading
```css
@import url('...') layer(tokens);
font-display: swap;
```

### **JavaScript Performance**

#### Debouncing & Throttling
```typescript
const handleScroll = debounce(() => {
  // Scroll logic
}, 100);
```

#### Event Delegation
```typescript
container.addEventListener('click', (e) => {
  const target = e.target.closest('.job-card');
  if (target) handleClick(target);
});
```

#### Lazy Loading
```typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadComponent(entry.target);
    }
  });
});
```

### **HTTP Performance**

#### Request Caching
```typescript
export class JobService {
  private cache: Map<string, CachedData> = new Map();
  private cacheTimeout: number = 5 * 60 * 1000;
  
  async fetchJobs(filters?: JobFilters) {
    const cached = this.cache.get(cacheKey);
    if (cached && !isExpired(cached)) {
      return cached.data;
    }
    // Fetch fresh data
  }
}
```

#### Request Timeout
```typescript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 10000);

fetch(url, { signal: controller.signal });
```

### **Animation Performance**

#### CSS Transitions
```css
.card {
  /* Hardware accelerated properties */
  transition: transform 200ms ease-out,
              opacity 200ms ease-out;
}

.card:hover {
  transform: translateY(-8px); /* GPU accelerated */
}
```

#### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🔧 Development Guide

### **Setup**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format
```

### **Creating a New Component**

1. **Create component file**:
```typescript
// src/components/my-component.ts
import { Component } from './base.component';

export class MyComponent extends Component {
  protected init(): void {
    this.setupEventListeners();
  }
  
  private setupEventListeners(): void {
    const button = this.$<HTMLButtonElement>('.my-button');
    this.addEventListener(button, 'click', this.handleClick);
  }
  
  private handleClick = (): void => {
    this.emit('buttonClicked', { timestamp: Date.now() });
  };
}
```

2. **Add component styles**:
```css
/* src/styles/components.css */
@layer components {
  .my-component {
    /* Component styles */
  }
}
```

3. **Initialize component**:
```typescript
// In main script or page-specific script
import { MyComponent } from './components/my-component';

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('.my-component');
  if (element) {
    new MyComponent({ el: element });
  }
});
```

### **Service Pattern**

```typescript
// src/services/my-service.ts
import { httpClient } from './http.service';

export class MyService {
  async fetchData() {
    const response = await httpClient.get('/api/data');
    return response;
  }
}

export const myService = new MyService();
```

### **Code Style Guidelines**

#### TypeScript
- Use strict mode
- Explicit return types
- Interface over type when possible
- Prefer const over let
- Use async/await over promises

#### CSS
- Mobile-first approach
- Use custom properties for theming
- Semantic class names (BEM-inspired)
- Prefer CSS over JavaScript for animations
- Use cascade layers for organization

#### Naming Conventions
- **Components**: PascalCase (e.g., `HeaderComponent`)
- **Services**: camelCase with Service suffix (e.g., `jobService`)
- **CSS Classes**: kebab-case (e.g., `.job-card`)
- **CSS Variables**: kebab-case with prefix (e.g., `--color-primary`)
- **TypeScript**: camelCase for variables, PascalCase for types

### **Testing**

```typescript
// Example unit test structure
describe('JobService', () => {
  it('should fetch jobs', async () => {
    const jobs = await jobService.fetchJobs();
    expect(jobs.success).toBe(true);
  });
});
```

## 📊 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## 🚀 Performance Metrics Goals

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 📚 Key Improvements

### **Design System**
✅ Comprehensive design tokens with 200+ variables  
✅ Fluid typography with responsive scaling  
✅ 11-step color scales for precise control  
✅ Dark mode with optimized values  
✅ Consistent spacing using 8px grid  

### **Code Architecture**
✅ Component-based architecture with TypeScript  
✅ Service layer for business logic  
✅ Utility functions for reusability  
✅ Type-safe HTTP client with error handling  
✅ Storage service with caching  

### **Accessibility**
✅ WCAG 2.1 AA compliant  
✅ Semantic HTML structure  
✅ ARIA attributes throughout  
✅ Keyboard navigation support  
✅ Screen reader optimized  

### **Performance**
✅ CSS containment for rendering optimization  
✅ Debounced/throttled event handlers  
✅ Request caching with expiration  
✅ Hardware-accelerated animations  
✅ Lazy loading strategy  

### **Responsiveness**
✅ Mobile-first CSS  
✅ Fluid layouts with CSS Grid  
✅ Breakpoint utilities  
✅ Touch-friendly interactions  
✅ Responsive images  

## 🔗 Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [CSS Tricks](https://css-tricks.com/)
- [Web.dev Performance](https://web.dev/performance/)

---

**Version**: 1.0.0  
**Last Updated**: November 30, 2025  
**Maintainer**: Frontend Architecture Team
