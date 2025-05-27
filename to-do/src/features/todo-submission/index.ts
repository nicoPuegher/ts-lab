import { createButtonComponent } from '@components/button.ts';
import { createFormComponent } from '@components/form.ts';
import { createLabelComponent } from '@components/label.ts';
import { createTextFeedbackComponent } from '@components/text-feedback.ts';
import { createTextInputComponent } from '@components/text-input.ts';

import { sanitizeInput } from '@features/todo-submission/helpers/sanitize-input.ts';
import { showErrorFeedback } from '@features/todo-submission/helpers/show-error-feedback.ts';
import { submitInput } from '@features/todo-submission/helpers/submit-input.ts';
import { validateInput } from '@features/todo-submission/helpers/validate-input.ts';

export function createTodoSubmission(): HTMLFormElement {
    const form = createFormComponent();
    const input = createTextInputComponent();
    const label = createLabelComponent(input.id, 'Todo item');
    const button = createButtonComponent('Add');
    const feedbackElement = createTextFeedbackComponent();

    input.addEventListener('input', () => handleClearValidationFeedback(feedbackElement));
    form.addEventListener('submit', (event: SubmitEvent) =>
        handleTodoSubmit(event as SubmitEvent, form, input, feedbackElement),
    );

    form.append(label, input, button, feedbackElement);

    return form;
}

function handleClearValidationFeedback(validationFeedback: HTMLParagraphElement): void {
    validationFeedback.textContent = '';
}

function handleTodoSubmit(
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
