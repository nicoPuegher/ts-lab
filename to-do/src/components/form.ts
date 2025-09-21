export function createFormComponent() {
    const form = document.createElement('form');
    form.setAttribute('role', 'form');
    form.setAttribute('tabindex', '0');
    form.classList.add('focusable');

    return form;
}
