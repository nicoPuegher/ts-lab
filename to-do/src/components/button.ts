export function createButtonComponent(textContent: string, variant: string = 'primary') {
    const button = document.createElement('button');
    button.textContent = textContent;
    button.setAttribute('tabindex', '-1');
    button.classList.add(variant, 'focusable');

    return button;
}
