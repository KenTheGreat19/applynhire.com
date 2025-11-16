/* Deprecated: logic consolidated into site/auth-forms.js and site/auth-common.js */

// Utility: SHA-256 hash
async function hashStringSHA256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Local storage keys (rename to match branding)
const ACCOUNTS_KEY = 'applynhireAccounts';
const SESSION_KEY = 'applynhireSession';

// Legacy keys from previous branding (used for migration fallback)
const LEGACY_ACCOUNTS_KEY = 'jobAggregatorAccounts';
const LEGACY_SESSION_KEY = 'jobAggregatorSession';

function migrateLegacyLocalStorage() {
    try {
        const existingSession = localStorage.getItem(SESSION_KEY);
        if (!existingSession) {
            const legacy = localStorage.getItem(LEGACY_SESSION_KEY);
            if (legacy) {
                localStorage.setItem(SESSION_KEY, legacy);
                localStorage.removeItem(LEGACY_SESSION_KEY);
                console.info('Migrated legacy session to applynhireSession');
            }
        }
        const existingAccounts = localStorage.getItem(ACCOUNTS_KEY);
        if (!existingAccounts) {
            const legacyAccounts = localStorage.getItem(LEGACY_ACCOUNTS_KEY);
            if (legacyAccounts) {
                localStorage.setItem(ACCOUNTS_KEY, legacyAccounts);
                localStorage.removeItem(LEGACY_ACCOUNTS_KEY);
                console.info('Migrated legacy accounts to applynhireAccounts');
            }
        }
    } catch (e) {
        console.warn('LocalStorage migration error', e);
    }
}

// Run migration at script load
migrateLegacyLocalStorage();

// Account helpers
function getAccounts() {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : [];
}

function saveAccounts(accounts) {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function getSession() {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
}

function saveSession(session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
}

// UI elements
const showSignInBtn = document.getElementById('showSignIn');
const showSignUpBtn = document.getElementById('showSignUp');
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const messageEl = document.getElementById('message');

// Toggle forms
showSignInBtn.addEventListener('click', () => toggleForms('signIn'));
showSignUpBtn.addEventListener('click', () => toggleForms('signUp'));

document.getElementById('switchToSignUp').addEventListener('click', (e) => { e.preventDefault(); toggleForms('signUp'); });
document.getElementById('switchToSignIn').addEventListener('click', (e) => { e.preventDefault(); toggleForms('signIn'); });

function toggleForms(form) {
    if (form === 'signIn') {
        signInForm.style.display = '';
        signUpForm.style.display = 'none';
        showSignInBtn.classList.add('active');
        showSignUpBtn.classList.remove('active');
    } else {
        signInForm.style.display = 'none';
        signUpForm.style.display = '';
        showSignInBtn.classList.remove('active');
        showSignUpBtn.classList.add('active');
    }
    messageEl.textContent = '';
}

// SignUp
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim().toLowerCase();
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;
    const role = document.getElementById('signupRole').value;

    if (!name || !email || !password) {
        showMessage('Please complete all fields', 'error');
        return;
    }

    if (password !== passwordConfirm) {
        showMessage("Passwords don't match", 'error');
        return;
    }

    const accounts = getAccounts();
    if (accounts.some(acc => acc.email === email)) {
        showMessage('An account with that email already exists', 'error');
        return;
    }

    // Hash password
    const hash = await hashStringSHA256(password);

    const newAccount = {
        id: 'acc_' + Math.random().toString(36).substring(2, 9),
        name,
        email,
        passwordHash: hash,
        role,
        createdAt: new Date().toISOString()
    };

    accounts.push(newAccount);
    saveAccounts(accounts);

    // Sign in automatically
    saveSession({ id: newAccount.id, email: newAccount.email, role: newAccount.role, name: newAccount.name, createdAt: new Date().toISOString() });

    showMessage('Account created and signed in successfully!', 'success');

    // Redirect after short delay
    setTimeout(() => {
        redirectToRolePage(newAccount.role);
    }, 700);
});

// SignIn
signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('signinEmail').value.trim().toLowerCase();
    const password = document.getElementById('signinPassword').value;
    const role = document.getElementById('signinRole').value;

    if (!email || !password) {
        showMessage('Please provide email and password', 'error');
        return;
    }

    const accounts = getAccounts();
    const account = accounts.find(acc => acc.email === email && acc.role === role);
    if (!account) {
        showMessage('No account found for this email/role', 'error');
        return;
    }

    const hash = await hashStringSHA256(password);
    if (hash !== account.passwordHash) {
        showMessage('Invalid email or password', 'error');
        return;
    }

    saveSession({ id: account.id, email: account.email, role: account.role, name: account.name, createdAt: new Date().toISOString() });
    showMessage('Signed in successfully!', 'success');

    setTimeout(() => {
        redirectToRolePage(account.role);
    }, 500);
});

// This file is deprecated and kept only for historical reference. See site/auth-forms.js and site/auth-common.js

function redirectToRolePage(role) {
    if (role === 'employer') {
        window.location.href = 'employer.html';
    } else {
        window.location.href = 'applicant.html';
    }
}

// If the user is already signed in, optionally redirect from auth page
// End of deprecated file.
