export function createLabelComponent(id: string, textContent: string): HTMLLabelElement {
    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = textContent;

    return label;
}
