// Employer sign-in page behavior
// This script locks sign in to role 'employer' and reuses the authCommon helper.

async function handleEmployerSignIn(event) {
    event.preventDefault();
    const email = document.getElementById('signinEmail').value.trim().toLowerCase();
    const password = document.getElementById('signinPassword').value;
    const role = 'employer'; // locked to employer
    const messageEl = document.getElementById('message');

    function showMessage(msg, type = 'error') {
        messageEl.textContent = msg;
        messageEl.className = 'auth-message ' + type;
    }

    if (!email || !password) {
        showMessage('Please provide email and password', 'error');
        return;
    }

    const accounts = authCommon.getAccounts();
    const account = accounts.find(acc => acc.email === email && acc.role === role);
    if (!account) {
        showMessage('No employer account found for this email', 'error');
        return;
    }

    const hash = await authCommon.hashStringSHA256(password);
    if (hash !== account.passwordHash) {
        showMessage('Invalid email or password', 'error');
        return;
    }

    authCommon.saveSession({ id: account.id, email: account.email, role: account.role, name: account.name, createdAt: new Date().toISOString() });
    showMessage('Signed in successfully!', 'success');
    setTimeout(() => authCommon.redirectToRolePage(account.role), 500);
}

// Attach handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signInForm');
    if (form) form.addEventListener('submit', handleEmployerSignIn);
});