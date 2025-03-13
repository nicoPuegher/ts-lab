export function createButtonComponent(textContent: string, variant: string = 'primary'): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement('button');
    button.textContent = textContent;

    return button;
}
