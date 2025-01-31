import { sanitizeInput } from '@features/task-submission/helpers/sanitize-input.ts';
import { showErrorFeedback } from '@features/task-submission/helpers/show-error-feedback.ts';
import { submitInput } from '@features/task-submission/helpers/submit-input.ts';
import { validateInput } from '@features/task-submission/helpers/validate-input.ts';

export function handleSubmit(
    event: SubmitEvent,
    form: HTMLFormElement,
    input: HTMLInputElement,
    feedback: HTMLParagraphElement,
): void {
    event.preventDefault();

    const data: FormData = new FormData(event.target as HTMLFormElement);
    const value: string = data.get(input.name) as string;

    const errorMessage: string = validateInput(value);
    if (errorMessage) {
        showErrorFeedback(input, feedback, errorMessage);
        return;
    }

    form.reset();
    input.focus();

    submitInput(sanitizeInput(value));
}
