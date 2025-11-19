// Header JS: mobile menu toggle and accessibility behavior
(function() {
    function toggleMenu() {
        const rightNav = document.querySelector('.right-nav');
        if (!rightNav) return;
        const expanded = rightNav.classList.toggle('open');
        const button = rightNav.querySelector('.mobile-menu-toggle');
        if (button) button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }

    function closeMenu() {
        const rightNav = document.querySelector('.right-nav');
        if (!rightNav) return;
        rightNav.classList.remove('open');
        const button = rightNav.querySelector('.mobile-menu-toggle');
        if (button) button.setAttribute('aria-expanded', 'false');
    }

    function onDocumentClick(e) {
        const rightNav = document.querySelector('.right-nav');
        if (!rightNav) return;
        if (!rightNav.contains(e.target) && rightNav.classList.contains('open')) {
            closeMenu();
        }
    }

    function onKeyDown(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const rightNav = document.querySelector('.right-nav');
        if (!rightNav) return;

        // If not present, add the toggle button
        let toggle = rightNav.querySelector('.mobile-menu-toggle');
        if (!toggle) {
            toggle = document.createElement('button');
            toggle.type = 'button';
            toggle.className = 'mobile-menu-toggle';
            toggle.setAttribute('aria-controls', 'mobileMenu');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Open menu');
            toggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
            // Insert the toggle at the start of the right nav
            rightNav.insertBefore(toggle, rightNav.firstChild);
        }

        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });

        document.addEventListener('click', onDocumentClick);
        document.addEventListener('keydown', onKeyDown);
        // Close menu on resize when wider than mobile breakpoint
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    });
})();
