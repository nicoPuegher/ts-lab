export function createTextFeedbackComponent(textContent: string): HTMLParagraphElement {
    const textFeedback = document.createElement('p');

    textFeedback.textContent = textContent;

    return textFeedback;
}
