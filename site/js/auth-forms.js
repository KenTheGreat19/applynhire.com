/* Auth forms: sign in / sign up logic */
document.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.getElementById('signin-form');
    if (signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = AuthCommon.parseForm(signInForm);
            console.log('Sign in', data);
        });
    }
});
