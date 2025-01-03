export function createButtonComponent(textContent: string): HTMLButtonElement {
    const button = document.createElement('button');

    button.textContent = textContent;

    return button;
}
