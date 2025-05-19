export function createButtonComponent(textContent: string, variant: string = 'primary'): HTMLButtonElement {
    const button = document.createElement('button');
    button.classList.add(variant);
    button.textContent = textContent;

    return button;
}
