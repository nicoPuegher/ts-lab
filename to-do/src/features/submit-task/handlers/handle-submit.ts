import { sanitizeInput } from '@features/submit-task/helpers/sanitize-input.ts';
import { showErrorFeedback } from '@features/submit-task/helpers/show-error-feedback.ts';
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

    form.reset();
    input.focus();

    submitInput(sanitizeInput(value));
}
