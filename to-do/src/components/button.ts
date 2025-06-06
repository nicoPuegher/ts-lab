export function createButtonComponent(textContent: string, variant: string = 'primary') {
    const button = document.createElement('button');
    button.textContent = textContent;
    button.classList.add(variant);

    return button;
}
