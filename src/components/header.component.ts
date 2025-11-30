/**
 * Header Component - Site navigation and theme toggle
 * Includes accessibility features and responsive behavior
 */

import { Component } from './base.component';
import { ThemeStorage, LanguageStorage } from '../services/storage.service';
import { debounce } from '../utils/helpers';

export class HeaderComponent extends Component {
  private mobileMenuToggle: HTMLButtonElement | null = null;
  private headerActions: HTMLElement | null = null;
  private themeToggle: HTMLButtonElement | null = null;
  private langBtn: HTMLButtonElement | null = null;
  private langDropdown: HTMLElement | null = null;
  private isScrolled: boolean = false;
  
  protected init(): void {
    this.setupElements();
    this.initTheme();
    this.setupEventListeners();
    this.setupScrollBehavior();
    this.setupKeyboardNavigation();
  }
  
  private setupElements(): void {
    // Mobile menu toggle
    this.mobileMenuToggle = this.$<HTMLButtonElement>('.mobile-menu-toggle');
    if (!this.mobileMenuToggle) {
      this.createMobileMenuToggle();
    }
    
    this.headerActions = this.$('.header-actions');
    this.themeToggle = this.$<HTMLButtonElement>('#themeToggle');
    this.langBtn = this.$<HTMLButtonElement>('#langBtn');
    this.langDropdown = this.$('#langDropdown');
  }
  
  private createMobileMenuToggle(): void {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mobile-menu-toggle';
    toggle.setAttribute('aria-controls', 'headerActions');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Toggle navigation menu');
    toggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
    
    const rightNav = this.$('.right-nav, .header-actions')?.parentElement;
    if (rightNav) {
      rightNav.insertBefore(toggle, rightNav.firstChild);
      this.mobileMenuToggle = toggle;
    }
  }
  
  private initTheme(): void {
    const savedTheme = ThemeStorage.get();
    this.applyTheme(savedTheme);
  }
  
  private applyTheme(theme: string): void {
    const body = document.body;
    const icon = this.themeToggle?.querySelector('i');
    
    if (theme === 'dark') {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
      body.setAttribute('data-theme', 'dark');
      
      if (icon) {
        icon.className = 'fas fa-sun';
      }
      
      if (this.themeToggle) {
        this.themeToggle.setAttribute('aria-pressed', 'true');
        this.themeToggle.setAttribute('aria-label', 'Switch to light theme');
      }
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
      body.setAttribute('data-theme', 'light');
      
      if (icon) {
        icon.className = 'fas fa-moon';
      }
      
      if (this.themeToggle) {
        this.themeToggle.setAttribute('aria-pressed', 'false');
        this.themeToggle.setAttribute('aria-label', 'Switch to dark theme');
      }
    }
  }
  
  private setupEventListeners(): void {
    // Mobile menu toggle
    if (this.mobileMenuToggle && this.headerActions) {
      this.addEventListener(this.mobileMenuToggle, 'click', this.handleMobileMenuToggle.bind(this));
    }
    
    // Theme toggle
    if (this.themeToggle) {
      this.addEventListener(this.themeToggle, 'click', this.handleThemeToggle.bind(this));
    }
    
    // Language selector
    if (this.langBtn && this.langDropdown) {
      this.addEventListener(this.langBtn, 'click', this.handleLangToggle.bind(this));
      
      const langOptions = this.langDropdown.querySelectorAll('.lang-option');
      langOptions.forEach(option => {
        this.addEventListener(option as HTMLElement, 'click', this.handleLangSelect.bind(this));
      });
    }
    
    // Close dropdowns when clicking outside
    this.addEventListener(document, 'click', this.handleClickOutside.bind(this));
    
    // Handle window resize
    const handleResize = debounce(() => {
      if (window.innerWidth > 768) {
        this.closeMobileMenu();
      }
    }, 250);
    
    this.addEventListener(window, 'resize', handleResize);
  }
  
  private setupScrollBehavior(): void {
    const handleScroll = debounce(() => {
      const scrolled = window.scrollY > 50;
      
      if (scrolled !== this.isScrolled) {
        this.isScrolled = scrolled;
        this.toggleClass(this.el, 'scrolled', scrolled);
      }
    }, 100);
    
    this.addEventListener(window, 'scroll', handleScroll);
  }
  
  private setupKeyboardNavigation(): void {
    this.addEventListener(document, 'keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
        this.closeLangDropdown();
      }
    });
  }
  
  private handleMobileMenuToggle(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    
    const parent = this.mobileMenuToggle?.closest('.right-nav, .header-content');
    if (!parent) return;
    
    const isOpen = parent.classList.contains('open');
    
    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }
  
  private openMobileMenu(): void {
    const parent = this.mobileMenuToggle?.closest('.right-nav, .header-content');
    if (!parent) return;
    
    parent.classList.add('open');
    
    if (this.mobileMenuToggle) {
      this.setAttr(this.mobileMenuToggle, 'aria-expanded', 'true');
    }
    
    if (this.headerActions) {
      this.show(this.headerActions);
      
      // Focus first focusable element
      const firstFocusable = this.headerActions.querySelector<HTMLElement>('button, a, input, select');
      firstFocusable?.focus();
    }
  }
  
  private closeMobileMenu(): void {
    const parent = this.mobileMenuToggle?.closest('.right-nav, .header-content');
    if (!parent) return;
    
    parent.classList.remove('open');
    
    if (this.mobileMenuToggle) {
      this.setAttr(this.mobileMenuToggle, 'aria-expanded', 'false');
    }
  }
  
  private handleThemeToggle(): void {
    const body = document.body;
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    this.applyTheme(newTheme);
    ThemeStorage.set(newTheme);
    
    // Emit theme change event
    this.emit('themeChanged', { theme: newTheme });
  }
  
  private handleLangToggle(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    
    if (!this.langDropdown) return;
    
    const isOpen = this.langDropdown.getAttribute('aria-hidden') === 'false';
    
    if (isOpen) {
      this.closeLangDropdown();
    } else {
      this.openLangDropdown();
    }
  }
  
  private openLangDropdown(): void {
    if (!this.langDropdown || !this.langBtn) return;
    
    this.setAttr(this.langDropdown, 'aria-hidden', 'false');
    this.setAttr(this.langBtn, 'aria-expanded', 'true');
    
    // Focus first option
    const firstOption = this.langDropdown.querySelector<HTMLElement>('.lang-option');
    firstOption?.focus();
  }
  
  private closeLangDropdown(): void {
    if (!this.langDropdown || !this.langBtn) return;
    
    this.setAttr(this.langDropdown, 'aria-hidden', 'true');
    this.setAttr(this.langBtn, 'aria-expanded', 'false');
  }
  
  private handleLangSelect(e: Event): void {
    const target = e.currentTarget as HTMLElement;
    const lang = target.getAttribute('data-lang');
    
    if (lang) {
      LanguageStorage.set(lang);
      this.closeLangDropdown();
      
      // Emit language change event
      this.emit('languageChanged', { language: lang });
      
      // Update flag icon
      const flag = target.querySelector('.flag-icon');
      if (flag && this.langBtn) {
        const btnFlag = this.langBtn.querySelector('.flag-icon');
        if (btnFlag) {
          btnFlag.textContent = flag.textContent;
        }
      }
    }
  }
  
  private handleClickOutside(e: Event): void {
    const target = e.target as Node;
    
    // Close mobile menu if clicking outside
    if (this.mobileMenuToggle && !this.el.contains(target)) {
      this.closeMobileMenu();
    }
    
    // Close language dropdown if clicking outside
    if (this.langBtn && this.langDropdown) {
      if (!this.langBtn.contains(target) && !this.langDropdown.contains(target)) {
        this.closeLangDropdown();
      }
    }
  }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    if (header) {
      new HeaderComponent({ el: header as HTMLElement });
    }
  });
} else {
  const header = document.querySelector('.site-header');
  if (header) {
    new HeaderComponent({ el: header as HTMLElement });
  }
}
