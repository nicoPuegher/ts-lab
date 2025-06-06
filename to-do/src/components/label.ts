export function createLabelComponent(id: string, textContent: string) {
    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = textContent;

    return label;
}
