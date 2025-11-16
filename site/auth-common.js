// Shared auth utilities (client-side demo)

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

// Automatic migration: copy legacy keys to new keys if present and remove legacy keys
function migrateLegacyLocalStorage() {
    try {
        // Migrate session
        const existingSession = localStorage.getItem(SESSION_KEY);
        if (!existingSession) {
            const legacySession = localStorage.getItem(LEGACY_SESSION_KEY);
            if (legacySession) {
                localStorage.setItem(SESSION_KEY, legacySession);
                // Optionally remove legacy entry to prevent confusion
                localStorage.removeItem(LEGACY_SESSION_KEY);
                console.info('Migrated legacy session to new applynhireSession');
            }
        }

        // Migrate accounts
        const existingAccounts = localStorage.getItem(ACCOUNTS_KEY);
        if (!existingAccounts) {
            const legacyAccounts = localStorage.getItem(LEGACY_ACCOUNTS_KEY);
            if (legacyAccounts) {
                localStorage.setItem(ACCOUNTS_KEY, legacyAccounts);
                localStorage.removeItem(LEGACY_ACCOUNTS_KEY);
                console.info('Migrated legacy accounts to new applynhireAccounts');
            }
        }
    } catch (e) {
        // Swallow errors (e.g., localStorage disabled) but log for debugging
        console.warn('LocalStorage migration failed', e);
    }
}

// Run migration on load
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
