/**
 * HTTP Client - Fetch API wrapper with error handling
 * Provides a consistent interface for API calls
 */

import { CONFIG } from '../config/constants';
import { TokenStorage } from './storage.service';
import type { ApiResponse } from '../types';

export interface RequestOptions extends RequestInit {
  params?: Record<string, any>;
  timeout?: number;
}

export class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: any
  ) {
    super(`HTTP Error ${status}: ${statusText}`);
    this.name = 'HttpError';
  }
}

export class HttpClient {
  private baseURL: string;
  private defaultTimeout: number;
  
  constructor(baseURL: string = CONFIG.API.BASE_URL, timeout: number = CONFIG.API.TIMEOUT) {
    this.baseURL = baseURL;
    this.defaultTimeout = timeout;
  }
  
  /**
   * Create request with timeout
   */
  private async fetchWithTimeout(url: string, options: RequestOptions): Promise<Response> {
    const timeout = options.timeout || this.defaultTimeout;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      
      throw error;
    }
  }
  
  /**
   * Build full URL with query params
   */
  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.baseURL);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return url.toString();
  }
  
  /**
   * Get default headers
   */
  private getDefaultHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    const token = TokenStorage.get();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }
  
  /**
   * Process response
   */
  private async processResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new HttpError(response.status, response.statusText, error);
    }
    
    const data = await response.json();
    
    return {
      success: true,
      data,
    };
  }
  
  /**
   * GET request
   */
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, options.params);
      
      const response = await this.fetchWithTimeout(url, {
        ...options,
        method: 'GET',
        headers: {
          ...this.getDefaultHeaders(),
          ...options.headers,
        },
      });
      
      return this.processResponse<T>(response);
    } catch (error) {
      console.error('GET request error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
  
  /**
   * POST request
   */
  async post<T>(endpoint: string, body?: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, options.params);
      
      const response = await this.fetchWithTimeout(url, {
        ...options,
        method: 'POST',
        headers: {
          ...this.getDefaultHeaders(),
          ...options.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      
      return this.processResponse<T>(response);
    } catch (error) {
      console.error('POST request error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
  
  /**
   * PUT request
   */
  async put<T>(endpoint: string, body?: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, options.params);
      
      const response = await this.fetchWithTimeout(url, {
        ...options,
        method: 'PUT',
        headers: {
          ...this.getDefaultHeaders(),
          ...options.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      
      return this.processResponse<T>(response);
    } catch (error) {
      console.error('PUT request error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
  
  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, options.params);
      
      const response = await this.fetchWithTimeout(url, {
        ...options,
        method: 'DELETE',
        headers: {
          ...this.getDefaultHeaders(),
          ...options.headers,
        },
      });
      
      return this.processResponse<T>(response);
    } catch (error) {
      console.error('DELETE request error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
  
  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, body?: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, options.params);
      
      const response = await this.fetchWithTimeout(url, {
        ...options,
        method: 'PATCH',
        headers: {
          ...this.getDefaultHeaders(),
          ...options.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      
      return this.processResponse<T>(response);
    } catch (error) {
      console.error('PATCH request error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Singleton instance
export const httpClient = new HttpClient();
