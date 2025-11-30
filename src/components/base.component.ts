/**
 * Base Component Class
 * Provides lifecycle methods and common functionality
 */

export interface ComponentOptions {
  el: HTMLElement | string;
  data?: Record<string, any>;
  mounted?: () => void;
  unmounted?: () => void;
}

export abstract class Component {
  protected el: HTMLElement;
  protected data: Record<string, any>;
  protected listeners: Array<{ element: HTMLElement | Document | Window; event: string; handler: EventListener }> = [];
  
  constructor(options: ComponentOptions) {
    this.el = typeof options.el === 'string' 
      ? document.querySelector(options.el)! 
      : options.el;
    
    if (!this.el) {
      throw new Error(`Element not found: ${options.el}`);
    }
    
    this.data = options.data || {};
    
    this.init();
    
    if (options.mounted) {
      options.mounted.call(this);
    }
  }
  
  /**
   * Initialize component - override in subclass
   */
  protected abstract init(): void;
  
  /**
   * Add event listener and track it for cleanup
   */
  protected addEventListener<K extends keyof HTMLElementEventMap>(
    element: HTMLElement | Document | Window,
    event: K,
    handler: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void {
    element.addEventListener(event, handler as EventListener, options);
    this.listeners.push({ element, event, handler: handler as EventListener });
  }
  
  /**
   * Query element within component
   */
  protected $<T extends HTMLElement = HTMLElement>(selector: string): T | null {
    return this.el.querySelector<T>(selector);
  }
  
  /**
   * Query all elements within component
   */
  protected $$<T extends HTMLElement = HTMLElement>(selector: string): NodeListOf<T> {
    return this.el.querySelectorAll<T>(selector);
  }
  
  /**
   * Set attribute with ARIA support
   */
  protected setAttr(element: HTMLElement, name: string, value: string | boolean): void {
    if (typeof value === 'boolean') {
      element.setAttribute(name, value.toString());
    } else {
      element.setAttribute(name, value);
    }
  }
  
  /**
   * Toggle class
   */
  protected toggleClass(element: HTMLElement, className: string, force?: boolean): void {
    element.classList.toggle(className, force);
  }
  
  /**
   * Show element
   */
  protected show(element: HTMLElement): void {
    element.style.display = '';
    element.removeAttribute('hidden');
    this.setAttr(element, 'aria-hidden', 'false');
  }
  
  /**
   * Hide element
   */
  protected hide(element: HTMLElement): void {
    element.style.display = 'none';
    element.setAttribute('hidden', '');
    this.setAttr(element, 'aria-hidden', 'true');
  }
  
  /**
   * Emit custom event
   */
  protected emit(eventName: string, detail?: any): void {
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      cancelable: true,
    });
    
    this.el.dispatchEvent(event);
  }
  
  /**
   * Clean up component
   */
  destroy(): void {
    // Remove all event listeners
    this.listeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    
    this.listeners = [];
  }
}
