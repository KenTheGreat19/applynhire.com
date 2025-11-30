import type { UserSession, UserRole } from '../types';

// Auth forms: sign in / sign up logic

interface ParsedFormData {
  [key: string]: string;
}

interface AuthCommon {
  parseForm: (form: HTMLFormElement) => ParsedFormData;
}

declare global {
  interface Window {
    AuthCommon: AuthCommon;
  }
}

function setSession(session: UserSession): void {
  localStorage.setItem('applynhireSession', JSON.stringify(session));
}

document.addEventListener('DOMContentLoaded', () => {
  const signInForm = document.getElementById('signInForm') as HTMLFormElement | null;
  const signUpForm = document.getElementById('signUpForm') as HTMLFormElement | null;

  if (signInForm) {
    signInForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      const data = window.AuthCommon.parseForm(signInForm);
      const role = (data.role as UserRole) || 'applicant';
      const name = (data.email || '').split('@')[0] || 'User';
      
      setSession({ name, email: data.email || '', role });
      
      // Simple redirect depending on role
      if (role === 'employer') {
        location.href = 'employer.html';
      } else {
        location.href = 'applicant-dashboard.html';
      }
    });

    // Update UI colors based on role (applicant vs employer)
    const signinRoleSelect = signInForm.querySelector<HTMLSelectElement>('select[name="role"]');
    const avatar = document.querySelector<HTMLElement>('.auth-avatar');
    const submitBtn = signInForm.querySelector<HTMLButtonElement>('button[type="submit"]');
    
    if (signinRoleSelect && avatar && submitBtn) {
      signinRoleSelect.addEventListener('change', () => {
        const v = signinRoleSelect.value || 'applicant';
        avatar.classList.remove('employer', 'applicant');
        
        if (v === 'employer') {
          avatar.classList.add('employer');
          submitBtn.classList.remove('success-btn');
          submitBtn.classList.add('primary-btn');
        } else {
          avatar.classList.add('applicant');
          submitBtn.classList.remove('primary-btn');
          submitBtn.classList.add('success-btn');
        }
      });
      
      // Trigger initial change
      signinRoleSelect.dispatchEvent(new Event('change'));
    }
  }

  if (signUpForm) {
    signUpForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      const data = window.AuthCommon.parseForm(signUpForm);
      const role = (data.role as UserRole) || 'applicant';
      const name = data.name || (data.email || '').split('@')[0] || 'New User';
      
      setSession({ name, email: data.email || '', role });
      
      if (role === 'employer') {
        location.href = 'employer.html';
      } else {
        location.href = 'applicant-dashboard.html';
      }
    });

    // Similar role color toggle for signup forms
    const signupRole = signUpForm.querySelector<HTMLSelectElement>('select[name="role"]');
    const signupAvatar = document.querySelector<HTMLElement>('.auth-avatar');
    const signupSubmitBtn = signUpForm.querySelector<HTMLButtonElement>('button[type="submit"]');
    
    if (signupRole && signupAvatar && signupSubmitBtn) {
      signupRole.addEventListener('change', () => {
        const v = signupRole.value || 'applicant';
        signupAvatar.classList.remove('employer', 'applicant');
        
        if (v === 'employer') {
          signupAvatar.classList.add('employer');
          signupSubmitBtn.classList.remove('success-btn');
          signupSubmitBtn.classList.add('primary-btn');
        } else {
          signupAvatar.classList.add('applicant');
          signupSubmitBtn.classList.remove('primary-btn');
          signupSubmitBtn.classList.add('success-btn');
        }
      });
      
      signupRole.dispatchEvent(new Event('change'));
    }
  }
});
