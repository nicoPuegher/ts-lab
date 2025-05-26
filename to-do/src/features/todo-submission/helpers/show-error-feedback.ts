export function showErrorFeedback(input: HTMLInputElement, feedback: HTMLParagraphElement, message: string): void {
    input.focus();

    feedback.textContent = message;
}
