// Header JS: mobile menu toggle and accessibility behavior

function toggleMenu(): void {
  const rightNav = document.querySelector<HTMLElement>('.right-nav');
  if (!rightNav) return;
  
  const expanded = rightNav.classList.toggle('open');
  const button = rightNav.querySelector<HTMLButtonElement>('.mobile-menu-toggle');
  if (button) {
    button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }
}

function closeMenu(): void {
  const rightNav = document.querySelector<HTMLElement>('.right-nav');
  if (!rightNav) return;
  
  rightNav.classList.remove('open');
  const button = rightNav.querySelector<HTMLButtonElement>('.mobile-menu-toggle');
  if (button) {
    button.setAttribute('aria-expanded', 'false');
  }
}

function onDocumentClick(e: MouseEvent): void {
  const rightNav = document.querySelector<HTMLElement>('.right-nav');
  if (!rightNav) return;
  
  const target = e.target as Node;
  if (!rightNav.contains(target) && rightNav.classList.contains('open')) {
    closeMenu();
  }
}

function onKeyDown(e: KeyboardEvent): void {
  if (e.key === 'Escape') {
    closeMenu();
  }
}

// Theme Toggle Functionality
function toggleTheme(): void {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle?.querySelector('i');
  
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    if (icon) {
      icon.className = 'fas fa-moon';
    }
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    if (icon) {
      icon.className = 'fas fa-sun';
    }
    localStorage.setItem('theme', 'dark');
  }
}

function initTheme(): void {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle?.querySelector('i');
  
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    if (icon) {
      icon.className = 'fas fa-sun';
    }
  } else {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
    if (icon) {
      icon.className = 'fas fa-moon';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  initTheme();
  
  // Theme toggle listener
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  const rightNav = document.querySelector<HTMLElement>('.right-nav');
  if (!rightNav) return;

  // If not present, add the toggle button
  let toggle = rightNav.querySelector<HTMLButtonElement>('.mobile-menu-toggle');
  if (!toggle) {
    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mobile-menu-toggle';
    toggle.setAttribute('aria-controls', 'mobileMenu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
    // Insert the toggle at the start of the right nav
    rightNav.insertBefore(toggle, rightNav.firstChild);
  }

  toggle.addEventListener('click', (e: Event) => {
    e.preventDefault();
    toggleMenu();
  });

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onKeyDown);
  
  // Close menu on resize when wider than mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
});
