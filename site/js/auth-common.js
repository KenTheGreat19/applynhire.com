/* Basic auth utilities used in forms */
window.AuthCommon = (function() {
    function parseForm(form) {
        const data = {};
        const elements = form.querySelectorAll('input, select, textarea');
        elements.forEach(el => {
            if (!el.name) return;
            data[el.name] = el.value;
        });
        return data;
    }

    return { parseForm };
})();
