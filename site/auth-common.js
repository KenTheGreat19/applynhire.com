// Shared auth utilities (client-side demo)

// Utility: SHA-256 hash
async function hashStringSHA256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Local storage keys
const ACCOUNTS_KEY = 'jobAggregatorAccounts';
const SESSION_KEY = 'jobAggregatorSession';

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

// Return token for use in Authorization headers (if present)
function getToken() {
    const session = getSession();
    return session && session.token ? session.token : null;
}

function getAuthHeader() {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

// Small helper to redirect to role page
function redirectToRolePage(role) {
    if (role === 'employer') {
        window.location.href = 'employer.html';
    } else {
        window.location.href = 'applicant.html';
    }
}

// Commonly exported functions are in global scope for small demo
window.authCommon = {
    hashStringSHA256,
    getAccounts,
    saveAccounts,
    getSession,
    saveSession,
    clearSession,
    redirectToRolePage
    , getToken, getAuthHeader
};
