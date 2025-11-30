/**
 * Main Entry Point - ApplyNHire Frontend
 * Import this file to initialize the entire application
 */

// Import styles
import '../styles/main.css';

// Import components (auto-initialize)
import './components/header.component';

// Import services
export { jobService } from './services/job.service';
export { httpClient } from './services/http.service';
export { 
  localStorage, 
  sessionStorage,
  ThemeStorage,
  LanguageStorage,
  UserStorage,
  TokenStorage,
  SavedJobsStorage 
} from './services/storage.service';

// Import utilities
export * from './utils/helpers';

// Import config
export { CONFIG } from './config/constants';

// Import types
export * from './types';

// Log initialization
console.log('%c🚀 ApplyNHire Frontend Initialized', 'color: #3b82f6; font-size: 14px; font-weight: bold;');
console.log('%cVersion: 1.0.0', 'color: #64748b; font-size: 12px;');
console.log('%cArchitecture: Enterprise-level', 'color: #10b981; font-size: 12px;');

// Export version info
export const VERSION = '1.0.0';
export const BUILD_DATE = new Date().toISOString();
