// Basic auth utilities used in forms

interface ParsedFormData {
  [key: string]: string;
}

interface AuthCommon {
  parseForm: (form: HTMLFormElement) => ParsedFormData;
}

declare global {
  interface Window {
    AuthCommon: AuthCommon;
  }
}

window.AuthCommon = (function(): AuthCommon {
  function parseForm(form: HTMLFormElement): ParsedFormData {
    const data: ParsedFormData = {};
    const elements = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      'input, select, textarea'
    );
    
    elements.forEach(el => {
      if (!el.name) return;
      data[el.name] = el.value;
    });
    
    return data;
  }

  return { parseForm };
})();

export {};
