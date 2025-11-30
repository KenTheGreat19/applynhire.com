/**
 * Configuration Constants
 * Centralized configuration for the application
 */

export const CONFIG = {
  API: {
    BASE_URL: process.env.API_BASE_URL || 'http://127.0.0.1:8000',
    ENDPOINTS: {
      JOBS: '/api/jobs',
      AUTH: '/api/auth',
      USERS: '/api/users',
      APPLICATIONS: '/api/applications',
    },
    TIMEOUT: 10000,
  },
  
  STORAGE: {
    KEYS: {
      THEME: 'applynhire_theme',
      LANGUAGE: 'applynhire_language',
      USER: 'applynhire_user',
      TOKEN: 'applynhire_token',
      SAVED_JOBS: 'applynhire_saved_jobs',
    },
  },
  
  THEME: {
    LIGHT: 'light',
    DARK: 'dark',
    DEFAULT: 'light',
  },
  
  LANGUAGE: {
    DEFAULT: 'en',
    SUPPORTED: ['en', 'es', 'fr', 'de'],
  },
  
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 12,
    MAX_PAGE_SIZE: 50,
  },
  
  ANIMATION: {
    DURATION: {
      FAST: 150,
      BASE: 200,
      MEDIUM: 300,
      SLOW: 500,
    },
  },
  
  BREAKPOINTS: {
    XS: 320,
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536,
  },
} as const;

export type Theme = typeof CONFIG.THEME[keyof typeof CONFIG.THEME];
export type Language = typeof CONFIG.LANGUAGE.SUPPORTED[number];
