export function createButtonComponent(textContent: string): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement('button');
    button.textContent = textContent;

    return button;
}
