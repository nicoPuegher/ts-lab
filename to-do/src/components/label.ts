export function createLabelComponent(inputId: string, textContent: string): HTMLLabelElement {
    const label = document.createElement('label');
    label.htmlFor = inputId;
    label.textContent = textContent;

    return label;
}
