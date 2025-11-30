/**
 * Storage Service - LocalStorage & SessionStorage abstraction
 * Provides type-safe storage operations with error handling
 */

import { CONFIG } from '../config/constants';

export class StorageService {
  private storage: Storage;
  
  constructor(storage: Storage = localStorage) {
    this.storage = storage;
  }
  
  /**
   * Get item from storage
   */
  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = this.storage.getItem(key);
      
      if (item === null) {
        return defaultValue ?? null;
      }
      
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error getting item from storage: ${key}`, error);
      return defaultValue ?? null;
    }
  }
  
  /**
   * Set item in storage
   */
  set<T>(key: string, value: T): boolean {
    try {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item in storage: ${key}`, error);
      return false;
    }
  }
  
  /**
   * Remove item from storage
   */
  remove(key: string): boolean {
    try {
      this.storage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item from storage: ${key}`, error);
      return false;
    }
  }
  
  /**
   * Clear all items from storage
   */
  clear(): boolean {
    try {
      this.storage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage', error);
      return false;
    }
  }
  
  /**
   * Check if key exists
   */
  has(key: string): boolean {
    return this.storage.getItem(key) !== null;
  }
  
  /**
   * Get all keys
   */
  keys(): string[] {
    return Object.keys(this.storage);
  }
  
  /**
   * Get storage size in bytes
   */
  getSize(): number {
    let size = 0;
    for (const key in this.storage) {
      if (this.storage.hasOwnProperty(key)) {
        size += this.storage[key].length + key.length;
      }
    }
    return size;
  }
}

// Singleton instances
export const localStorage = new StorageService(window.localStorage);
export const sessionStorage = new StorageService(window.sessionStorage);

// Convenience functions for common keys
export const ThemeStorage = {
  get: (): string => localStorage.get(CONFIG.STORAGE.KEYS.THEME, CONFIG.THEME.DEFAULT) || CONFIG.THEME.DEFAULT,
  set: (theme: string): boolean => localStorage.set(CONFIG.STORAGE.KEYS.THEME, theme),
};

export const LanguageStorage = {
  get: (): string => localStorage.get(CONFIG.STORAGE.KEYS.LANGUAGE, CONFIG.LANGUAGE.DEFAULT) || CONFIG.LANGUAGE.DEFAULT,
  set: (language: string): boolean => localStorage.set(CONFIG.STORAGE.KEYS.LANGUAGE, language),
};

export const UserStorage = {
  get: (): any => localStorage.get(CONFIG.STORAGE.KEYS.USER),
  set: (user: any): boolean => localStorage.set(CONFIG.STORAGE.KEYS.USER, user),
  remove: (): boolean => localStorage.remove(CONFIG.STORAGE.KEYS.USER),
};

export const TokenStorage = {
  get: (): string | null => localStorage.get(CONFIG.STORAGE.KEYS.TOKEN),
  set: (token: string): boolean => localStorage.set(CONFIG.STORAGE.KEYS.TOKEN, token),
  remove: (): boolean => localStorage.remove(CONFIG.STORAGE.KEYS.TOKEN),
};

export const SavedJobsStorage = {
  get: (): number[] => localStorage.get(CONFIG.STORAGE.KEYS.SAVED_JOBS, []) || [],
  set: (jobIds: number[]): boolean => localStorage.set(CONFIG.STORAGE.KEYS.SAVED_JOBS, jobIds),
  add: (jobId: number): boolean => {
    const savedJobs = SavedJobsStorage.get();
    if (!savedJobs.includes(jobId)) {
      savedJobs.push(jobId);
      return SavedJobsStorage.set(savedJobs);
    }
    return false;
  },
  remove: (jobId: number): boolean => {
    const savedJobs = SavedJobsStorage.get();
    const filtered = savedJobs.filter(id => id !== jobId);
    return SavedJobsStorage.set(filtered);
  },
  has: (jobId: number): boolean => {
    const savedJobs = SavedJobsStorage.get();
    return savedJobs.includes(jobId);
  },
};
