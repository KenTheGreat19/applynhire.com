// Consolidated auth form handlers for Sign In / Sign Up
// This file replaces signin.js, signup.js, employer-signin.js, employer-signup.js
// and reuses utilities exported by auth-common.js (global authCommon)

// Common showMessage helper
function showMessage(messageEl, msg, type = 'error') {
    if (!messageEl) return;
    messageEl.textContent = msg;
    messageEl.className = 'auth-message ' + type;
}

const API_BASE = 'http://127.0.0.1:8000';

// Sign In handler (generic for applicant/employer pages)
async function handleSignIn(event) {
    event.preventDefault();
    const emailEl = document.getElementById('signinEmail');
    const passwordEl = document.getElementById('signinPassword');
    const roleEl = document.getElementById('signinRole');
    const messageEl = document.getElementById('message');
    const email = emailEl ? emailEl.value.trim().toLowerCase() : '';
    const password = passwordEl ? passwordEl.value : '';
    const role = roleEl ? roleEl.value : 'applicant';

    if (!email || !password) {
        showMessage(messageEl, 'Please provide email and password', 'error');
        return;
    }

    // Call backend sign-in endpoint
    try {
        const resp = await fetch(`${API_BASE}/api/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role })
        });
        if (!resp.ok) {
            const err = await resp.json().catch(() => ({ detail: 'Invalid credentials' }));
            showMessage(messageEl, err.detail || 'Invalid email or password', 'error');
            return;
        }
        const data = await resp.json();
        const token = data.access_token;
        const user = data.user;
        // Save session (token plus user fields) for siteAuth to use
        authCommon.saveSession({ token, id: user.id, email: user.email, role: user.role, name: user.name, createdAt: new Date().toISOString() });
        showMessage(messageEl, 'Signed in successfully!', 'success');
        setTimeout(() => authCommon.redirectToRolePage(user.role), 500);
    } catch (err) {
        // Fallback to client-local auth if network/backend is unavailable
        console.warn('Sign-in network error, falling back to local client storage', err);
        const accounts = authCommon.getAccounts();
        const account = accounts.find(acc => acc.email === email && acc.role === role);
        if (!account) {
            showMessage(messageEl, 'No account found for this email/role (local fallback)', 'error');
            return;
        }
        const hash = await authCommon.hashStringSHA256(password);
        if (hash !== account.passwordHash) {
            showMessage(messageEl, 'Invalid email or password', 'error');
            return;
        }
        authCommon.saveSession({ id: account.id, email: account.email, role: account.role, name: account.name, createdAt: new Date().toISOString() });
        showMessage(messageEl, 'Signed in successfully (local fallback)!', 'success');
        setTimeout(() => authCommon.redirectToRolePage(account.role), 500);
    }
}

// Sign Up handler (generic for applicant/employer pages)
async function handleSignUp(event) {
    event.preventDefault();
    const nameEl = document.getElementById('signupName');
    const emailEl = document.getElementById('signupEmail');
    const passwordEl = document.getElementById('signupPassword');
    const passwordConfirmEl = document.getElementById('signupPasswordConfirm');
    const roleEl = document.getElementById('signupRole');
    const messageEl = document.getElementById('message');

    const name = nameEl ? nameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim().toLowerCase() : '';
    const password = passwordEl ? passwordEl.value : '';
    const passwordConfirm = passwordConfirmEl ? passwordConfirmEl.value : '';
    const role = roleEl ? roleEl.value : 'applicant';

    if (!name || !email || !password) {
        showMessage(messageEl, 'Please complete all fields', 'error');
        return;
    }

    if (password !== passwordConfirm) {
        showMessage(messageEl, "Passwords don't match", 'error');
        return;
    }

    // Call backend signup endpoint and then sign in via the backend
    try {
        const resp = await fetch(`${API_BASE}/api/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });
        if (!resp.ok) {
            const err = await resp.json().catch(() => ({ detail: 'Unable to create account' }));
            showMessage(messageEl, err.detail || 'Unable to create account', 'error');
            return;
        }
        const user = await resp.json();
        // Immediately sign-in to obtain token
        const signinResp = await fetch(`${API_BASE}/api/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role })
        });
        if (!signinResp.ok) {
            const err = await signinResp.json().catch(() => ({ detail: 'Sign-in failed after signup' }));
            showMessage(messageEl, err.detail || 'Sign-in failed', 'error');
            return;
        }
        const signinData = await signinResp.json();
        const token = signinData.access_token;
        authCommon.saveSession({ token, id: user.id, email: user.email, role: user.role, name: user.name, createdAt: new Date().toISOString() });
        showMessage(messageEl, 'Account created and signed in successfully!', 'success');
        setTimeout(() => authCommon.redirectToRolePage(user.role), 700);
    } catch (err) {
        // Fallback to client-local auth if network/backend is unavailable
        console.warn('Sign-up network error, falling back to local client storage', err);
        const accounts = authCommon.getAccounts();
        if (accounts.some(acc => acc.email === email && acc.role === role)) {
            showMessage(messageEl, 'An account with that email already exists (local fallback)', 'error');
            return;
        }
        const hash = await authCommon.hashStringSHA256(password);
        const newAccount = {
            id: 'acc_' + Math.random().toString(36).substring(2, 9),
            name,
            email,
            passwordHash: hash,
            role,
            createdAt: new Date().toISOString()
        };
        accounts.push(newAccount);
        authCommon.saveAccounts(accounts);
        authCommon.saveSession({ id: newAccount.id, email: newAccount.email, role: newAccount.role, name: newAccount.name, createdAt: new Date().toISOString() });
        showMessage(messageEl, 'Account created and signed in successfully (local fallback)!', 'success');
        setTimeout(() => authCommon.redirectToRolePage(newAccount.role), 700);
    }
}

// Attach to DOM when present
document.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    if (signInForm) { signInForm.addEventListener('submit', handleSignIn); }
    if (signUpForm) { signUpForm.addEventListener('submit', handleSignUp); }
});

// Exports for tests and other scripts (if needed)
window.authForms = { handleSignIn, handleSignUp };
