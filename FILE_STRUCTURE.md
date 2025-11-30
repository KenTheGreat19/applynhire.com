# Enterprise Frontend Architecture - File Structure

```
applynhire.com/
│
├── 📁 src/                              # Source code directory
│   │
│   ├── 📁 styles/                       # CSS Architecture (CSS Cascade Layers)
│   │   ├── design-tokens.css           # 🎨 200+ design tokens, color scales, typography
│   │   ├── base.css                    # 🔧 Modern CSS reset, defaults, accessibility
│   │   ├── layout.css                  # 📐 Container, Grid, Flex, Stack utilities
│   │   ├── components.css              # 🧩 Buttons, Cards, Forms, Modals, etc.
│   │   └── main.css                    # 🎭 Site-specific styles, job cards, header
│   │
│   ├── 📁 components/                   # Component Architecture
│   │   ├── base.component.ts           # 🏗️ Abstract base class for all components
│   │   │                                #    - Lifecycle management
│   │   │                                #    - Event handling with cleanup
│   │   │                                #    - DOM utilities
│   │   │                                #    - Accessibility helpers
│   │   │
│   │   ├── header.component.ts         # 🔝 Site header component
│   │   │                                #    - Mobile menu toggle
│   │   │                                #    - Theme switching (dark/light)
│   │   │                                #    - Language selector
│   │   │                                #    - Scroll behavior
│   │   │                                #    - Keyboard navigation
│   │   │
│   │   ├── job-card.component.ts       # 💼 Job card component (example)
│   │   │                                #    - Interactive job listings
│   │   │                                #    - Like/save functionality
│   │   │                                #    - Accessibility features
│   │   │
│   │   └── modal.component.ts          # 🪟 Modal/Dialog component (example)
│   │                                    #    - Focus trap
│   │                                    #    - Keyboard handling (Escape)
│   │                                    #    - ARIA attributes
│   │
│   ├── 📁 services/                     # Service Layer (Business Logic)
│   │   ├── http.service.ts             # 🌐 HTTP client wrapper
│   │   │                                #    - Fetch API abstraction
│   │   │                                #    - Request timeout (10s)
│   │   │                                #    - Error handling
│   │   │                                #    - Auto token injection
│   │   │                                #    - Query param builder
│   │   │
│   │   ├── job.service.ts              # 💼 Job operations service
│   │   │                                #    - Fetch jobs with filters
│   │   │                                #    - Response caching (5min TTL)
│   │   │                                #    - Trending jobs calculation
│   │   │                                #    - Search functionality
│   │   │                                #    - Category filtering
│   │   │
│   │   ├── storage.service.ts          # 💾 Storage abstraction
│   │   │                                #    - localStorage wrapper
│   │   │                                #    - sessionStorage wrapper
│   │   │                                #    - Type-safe operations
│   │   │                                #    - Error handling
│   │   │                                #    - Convenience methods:
│   │   │                                #      * ThemeStorage
│   │   │                                #      * LanguageStorage
│   │   │                                #      * UserStorage
│   │   │                                #      * TokenStorage
│   │   │                                #      * SavedJobsStorage
│   │   │
│   │   ├── auth.service.ts             # 🔐 Authentication service (example)
│   │   └── analytics.service.ts        # 📊 Analytics service (example)
│   │
│   ├── 📁 utils/                        # Utility Functions
│   │   └── helpers.ts                  # 🛠️ 20+ pure utility functions
│   │                                    #    - escapeHtml (XSS prevention)
│   │                                    #    - debounce, throttle
│   │                                    #    - formatRelativeTime
│   │                                    #    - formatCurrency
│   │                                    #    - isInViewport
│   │                                    #    - scrollToElement
│   │                                    #    - parseQueryString
│   │                                    #    - deepClone
│   │                                    #    - retry with backoff
│   │                                    #    - makeCancelable
│   │
│   ├── 📁 config/                       # Configuration
│   │   └── constants.ts                # ⚙️ Application constants
│   │                                    #    - API endpoints
│   │                                    #    - Storage keys
│   │                                    #    - Theme settings
│   │                                    #    - Breakpoints
│   │                                    #    - Animation durations
│   │
│   ├── 📁 types/                        # TypeScript Definitions
│   │   └── index.ts                    # 📝 Type definitions
│   │                                    #    - Job, JobFilters
│   │                                    #    - User, UserSession
│   │                                    #    - ApiResponse
│   │                                    #    - AuthResponse
│   │                                    #    - Application
│   │
│   └── index.ts                        # 🚀 Main entry point
│                                        #    - Import orchestration
│                                        #    - Auto-initialization
│                                        #    - Export public API
│
├── 📁 documentation/                    # Project Documentation
│   ├── FRONTEND_ARCHITECTURE.md        # 📚 Comprehensive architecture guide
│   ├── REFACTOR_SUMMARY.md             # 📋 What changed and why
│   ├── QUICK_START.md                  # ⚡ 5-minute implementation guide
│   ├── BEFORE_AFTER.md                 # 📊 Comparison and metrics
│   ├── API_REFERENCE.md                # 🔌 API documentation (example)
│   └── COMPONENT_GUIDE.md              # 🧩 Component usage guide (example)
│
├── 📁 public/                           # Static assets
│   ├── index.html                      # Main HTML entry
│   └── 📁 assets/
│       ├── 📁 images/
│       ├── 📁 fonts/
│       └── 📁 vendor/
│
├── 📁 config/                           # Build configuration
│   └── tsconfig.json                   # TypeScript configuration
│
├── package.json                        # Dependencies and scripts
├── .gitignore                          # Git ignore rules
└── README.md                           # Project README

```

## 📊 Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                    │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────┐  │
│  │   HTML     │  │    CSS     │  │   Components    │  │
│  │  Semantic  │  │   Design   │  │   TypeScript    │  │
│  │   Markup   │  │   System   │  │   Classes       │  │
│  └────────────┘  └────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│                     SERVICE LAYER                        │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────┐  │
│  │    HTTP    │  │    Job     │  │    Storage      │  │
│  │  Service   │  │  Service   │  │    Service      │  │
│  │   (API)    │  │ (Business) │  │ (Persistence)   │  │
│  └────────────┘  └────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│                     UTILITY LAYER                        │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────┐  │
│  │  Helpers   │  │   Config   │  │     Types       │  │
│  │ (Functions)│  │ (Constants)│  │  (Definitions)  │  │
│  └────────────┘  └────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 🎨 CSS Architecture (Cascade Layers)

```
┌─────────────────────────────────────────┐
│         @layer tokens                    │ ← Lowest specificity
│  (Design tokens, CSS variables)         │
├─────────────────────────────────────────┤
│         @layer base                      │
│  (Reset, defaults, typography)          │
├─────────────────────────────────────────┤
│         @layer layout                    │
│  (Container, Grid, Flex)                │
├─────────────────────────────────────────┤
│         @layer components                │
│  (Buttons, Cards, Forms)                │
├─────────────────────────────────────────┤
│         @layer site                      │ ← Highest specificity
│  (Site-specific styles)                 │
└─────────────────────────────────────────┘
```

## 🧩 Component Hierarchy

```
Component (Base Class)
    │
    ├── HeaderComponent
    │   ├── MobileMenu
    │   ├── ThemeToggle
    │   └── LanguageSelector
    │
    ├── JobCardComponent
    │   ├── JobMeta
    │   ├── JobTags
    │   └── LikeButton
    │
    ├── SearchComponent
    │   ├── SearchInput
    │   ├── FilterDropdowns
    │   └── ResultsCount
    │
    └── ModalComponent
        ├── ModalHeader
        ├── ModalBody
        └── ModalFooter
```

## 🔄 Data Flow

```
┌──────────┐
│   User   │
│  Action  │
└────┬─────┘
     │
     ▼
┌──────────────┐
│  Component   │ ← Event handler
└────┬─────────┘
     │
     ▼
┌──────────────┐
│   Service    │ ← Business logic
│   (Job)      │   Caching
└────┬─────────┘
     │
     ▼
┌──────────────┐
│   Service    │ ← HTTP request
│   (HTTP)     │   Error handling
└────┬─────────┘
     │
     ▼
┌──────────────┐
│   Backend    │
│     API      │
└────┬─────────┘
     │
     ▼
┌──────────────┐
│   Service    │ ← Transform data
│   (Job)      │   Cache response
└────┬─────────┘
     │
     ▼
┌──────────────┐
│  Component   │ ← Update UI
│   Render     │   Emit events
└────┬─────────┘
     │
     ▼
┌──────────────┐
│     DOM      │
│   Update     │
└──────────────┘
```

## 🎯 Feature Organization

```
Feature: Job Listings
│
├── 📝 Types (Job, JobFilters)
│   └── src/types/index.ts
│
├── 💼 Service (JobService)
│   └── src/services/job.service.ts
│
├── 🧩 Component (JobCardComponent)
│   └── src/components/job-card.component.ts
│
└── 🎨 Styles (Job Card Styles)
    └── src/styles/main.css
```

## 📦 Module Dependencies

```
index.ts
    │
    ├── components/
    │   └── header.component.ts
    │       └── base.component.ts
    │           └── utils/helpers.ts
    │
    ├── services/
    │   ├── job.service.ts
    │   │   └── http.service.ts
    │   │       └── storage.service.ts
    │   │           └── config/constants.ts
    │   │
    │   └── storage.service.ts
    │       └── config/constants.ts
    │
    └── types/
        └── index.ts

(Zero circular dependencies)
```

## 🗂️ File Naming Conventions

```
Components:     component-name.component.ts
Services:       service-name.service.ts
Utilities:      helpers.ts, validators.ts
Types:          index.ts (barrel export)
Styles:         kebab-case.css
Config:         constants.ts, environment.ts
```

## 📊 Size Breakdown

```
Total Files:        11 TypeScript + 5 CSS + 4 Docs = 20 files
Total Lines:        ~3,500 lines
Documentation:      ~4,000 lines

Breakdown by Layer:
├── Styles:         ~1,500 lines (CSS)
├── Components:     ~800 lines (TS)
├── Services:       ~900 lines (TS)
├── Utils:          ~200 lines (TS)
├── Config:         ~100 lines (TS)
└── Docs:           ~4,000 lines (MD)
```

## 🎓 Learning Path

```
Day 1: Quick Start
    └── Read QUICK_START.md
    └── Implement basic example

Day 2: Design System
    └── Study design-tokens.css
    └── Build components with tokens

Day 3: Components
    └── Understand base.component.ts
    └── Create custom component

Day 4: Services
    └── Learn service patterns
    └── Integrate with API

Day 5: Architecture
    └── Read FRONTEND_ARCHITECTURE.md
    └── Understand full system
```

## 🔗 Key Relationships

```
Design Tokens ──> Base Styles ──> Components ──> Site Styles
                                        │
                                        ▼
                                  TypeScript
                                  Components
                                        │
                                        ▼
                                    Services
                                        │
                                        ▼
                                  Backend API
```

---

**This structure provides:**
✅ Clear organization  
✅ Separation of concerns  
✅ Scalability  
✅ Maintainability  
✅ Type safety  
✅ Performance  
✅ Accessibility  
✅ Documentation  
