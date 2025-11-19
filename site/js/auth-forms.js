/* Auth forms: sign in / sign up logic */
document.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');

    function setSession(session) {
        localStorage.setItem('applynhireSession', JSON.stringify(session));
    }

    if (signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = AuthCommon.parseForm(signInForm);
            const role = data.role || 'applicant';
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
        const signinRoleSelect = signInForm.querySelector('select[name="role"]');
        const avatar = document.querySelector('.auth-avatar');
        const submitBtn = signInForm.querySelector('button[type="submit"]');
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
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = AuthCommon.parseForm(signUpForm);
            const role = data.role || 'applicant';
            const name = data.name || (data.email || '').split('@')[0] || 'New User';
            setSession({ name, email: data.email || '', role });
            if (role === 'employer') {
                location.href = 'employer.html';
            } else {
                location.href = 'applicant-dashboard.html';
            }
        });
        // Similar role color toggle for signup forms
        const signupRole = signUpForm.querySelector('select[name="role"]');
        const signupAvatar = document.querySelector('.auth-avatar');
        const signupSubmitBtn = signUpForm.querySelector('button[type="submit"]');
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
