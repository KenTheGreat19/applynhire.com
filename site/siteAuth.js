// Small site auth utility to show sign in/out status in header nav

function getSession() {
    const raw = localStorage.getItem('jobAggregatorSession');
    return raw ? JSON.parse(raw) : null;
}

function showHeaderAuth() {
    const nav = document.querySelector('.auth-nav');
    if (!nav) return;

    const session = getSession();
    nav.innerHTML = '';
    if (session && session.email) {
        const name = session.name ? session.name.split(' ')[0] : session.email;
        const userSpan = document.createElement('span');
        userSpan.className = 'auth-user';
        userSpan.style.color = 'white';
        userSpan.style.marginRight = '8px';
        userSpan.textContent = `Hi, ${name}`;

        const signOutBtn = document.createElement('a');
        signOutBtn.href = '#';
        signOutBtn.className = 'auth-link';
        signOutBtn.textContent = 'Sign Out';
        signOutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.authCommon && typeof window.authCommon.clearSession === 'function') {
                window.authCommon.clearSession();
            } else {
                localStorage.removeItem('jobAggregatorSession');
            }
            location.reload();
        });

        nav.appendChild(userSpan);
        nav.appendChild(signOutBtn);
        // Always keep an employer link for quick access when signed in
        const employerLink = document.createElement('a');
        employerLink.className = 'auth-link';
        if (session.role === 'employer') {
            employerLink.href = 'employer.html';
            employerLink.textContent = 'Employer site';
        } else {
            employerLink.href = 'employer-signin.html';
            employerLink.textContent = 'Employer site';
        }
        employerLink.style.marginLeft = '8px';
        nav.appendChild(employerLink);
    } else {
        const signInLink = document.createElement('a');
        signInLink.href = 'signin.html';
        signInLink.className = 'sign-in-btn';
        signInLink.textContent = 'Sign in';

        const signUpLink = document.createElement('a');
        signUpLink.href = 'signup.html';
        signUpLink.className = 'auth-link';
        signUpLink.textContent = 'Sign Up';
        signUpLink.style.marginLeft = '8px';

        const employerLink = document.createElement('a');
        employerLink.href = 'employer-signin.html';
        employerLink.className = 'employer-link';
        employerLink.textContent = 'Employer site';
        employerLink.style.marginLeft = '12px';

        nav.appendChild(signInLink);
        nav.appendChild(signUpLink);
        nav.appendChild(employerLink);
    }
}

// Run on load, but if running in head before DOM ready, run after DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showHeaderAuth);
} else {
    showHeaderAuth();
}
