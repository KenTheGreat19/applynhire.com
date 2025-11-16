// Consolidated auth form handlers for Sign In / Sign Up
// This file replaces signin.js, signup.js, employer-signin.js, employer-signup.js
// and reuses utilities exported by auth-common.js (global authCommon)

// Common showMessage helper
function showMessage(messageEl, msg, type = 'error') {
    if (!messageEl) return;
    messageEl.textContent = msg;
    messageEl.className = 'auth-message ' + type;
}

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

    const accounts = authCommon.getAccounts();
    const account = accounts.find(acc => acc.email === email && acc.role === role);
    if (!account) {
        showMessage(messageEl, 'No account found for this email/role', 'error');
        return;
    }

    const hash = await authCommon.hashStringSHA256(password);
    if (hash !== account.passwordHash) {
        showMessage(messageEl, 'Invalid email or password', 'error');
        return;
    }

    authCommon.saveSession({ id: account.id, email: account.email, role: account.role, name: account.name, createdAt: new Date().toISOString() });
    showMessage(messageEl, 'Signed in successfully!', 'success');
    setTimeout(() => authCommon.redirectToRolePage(account.role), 500);
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

    const accounts = authCommon.getAccounts();
    if (accounts.some(acc => acc.email === email && acc.role === role)) {
        showMessage(messageEl, 'An account with that email already exists', 'error');
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

    // Sign in automatically
    authCommon.saveSession({ id: newAccount.id, email: newAccount.email, role: newAccount.role, name: newAccount.name, createdAt: new Date().toISOString() });

    showMessage(messageEl, 'Account created and signed in successfully!', 'success');
    setTimeout(() => authCommon.redirectToRolePage(newAccount.role), 700);
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
