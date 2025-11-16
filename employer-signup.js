// Employer sign-up page behavior
// Create employer accounts only (role locked to 'employer') and reuse authCommon.

async function handleEmployerSignUp(event) {
    event.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim().toLowerCase();
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;
    const role = 'employer';
    const messageEl = document.getElementById('message');

    function showMessage(msg, type = 'error') {
        messageEl.textContent = msg;
        messageEl.className = 'auth-message ' + type;
    }

    if (!name || !email || !password) {
        showMessage('Please complete all fields', 'error');
        return;
    }

    if (password !== passwordConfirm) {
        showMessage("Passwords don't match", 'error');
        return;
    }

    const accounts = authCommon.getAccounts();
    if (accounts.some(acc => acc.email === email && acc.role === role)) {
        showMessage('An employer account with that email already exists', 'error');
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

    showMessage('Employer account created and signed in successfully!', 'success');
    setTimeout(() => authCommon.redirectToRolePage(newAccount.role), 700);
}

// Attach handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signUpForm');
    if (form) form.addEventListener('submit', handleEmployerSignUp);
});