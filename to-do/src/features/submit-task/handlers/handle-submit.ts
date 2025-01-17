import { clearErrorFeedback, showErrorFeedback } from '@features/submit-task/helpers/error-feedback.ts';
import { sanitizeInput } from '@features/submit-task/helpers/sanitize-input.ts';
import { submitInput } from '@features/submit-task/helpers/submit-input.ts';
import { validateInput } from '@features/submit-task/helpers/validate-input.ts';

export function handleSubmit(
    event: SubmitEvent,
    form: HTMLFormElement,
    input: HTMLInputElement,
    feedback: HTMLParagraphElement,
): void {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const value = data.get(input.name) as string;

    const errorMessage = validateInput(value);
    if (errorMessage) {
        showErrorFeedback(input, feedback, errorMessage);
        return;
    }

    clearErrorFeedback(feedback);

    form.reset();

    submitInput(sanitizeInput(value));
}
