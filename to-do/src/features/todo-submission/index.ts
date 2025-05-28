import { createButtonComponent } from '@components/button.ts';
import { createErrorComponent } from '@components/error.ts';
import { createFormComponent } from '@components/form.ts';
import { createLabelComponent } from '@components/label.ts';
import { createTextInputComponent } from '@components/text-input.ts';

export function createTodoSubmission() {
    const form = createFormComponent();
    const input = createTextInputComponent();
    const label = createLabelComponent(input.id, 'Todo item');
    const button = createButtonComponent('Add');
    const errorElement = createErrorComponent();

    input.addEventListener('input', () => handleClearValidationFeedback(errorElement));
    form.addEventListener('submit', (event) => handleTodoSubmission(event, form, input, errorElement));

    form.append(label, input, button, errorElement);

    return form;
}

function handleClearValidationFeedback(validationFeedback: HTMLParagraphElement) {
    validationFeedback.textContent = '';
}

function handleTodoSubmission(
    event: SubmitEvent,
    form: HTMLFormElement,
    input: HTMLInputElement,
    errorElement: HTMLParagraphElement,
) {
    event.preventDefault();

    if (!(event.target instanceof HTMLFormElement)) return;

    const errorMessage: string = validateInput(value);
    if (errorMessage) {
        showErrorFeedback(input, feedback, errorMessage);
        return;
    }

    form.reset();
    input.focus();

    submitInput(sanitizeInput(value));
}

function validateTodoText(userInput: string) {
    const trimmedUserInput: string = userInput.trim();

    if (trimmedUserInput.length == 0) {
        return 'Cannot be empty.';
    }

    if (trimmedUserInput.length < 3 || trimmedUserInput.length > 25) {
        return 'Must be between 3 and 25 characters long.';
    }

    if (!/^[a-zA-Z0-9\s]+$/.test(trimmedUserInput)) {
        return 'Only letters, numbers, and spaces allowed.';
    }

    if (/^\d+$/.test(trimmedUserInput)) {
        return 'Cannot contain only numbers.';
    }

    return null;
}

function showErrorMessage(textInput: HTMLInputElement, errorElement: HTMLParagraphElement, errorMessage: string) {
    errorElement.textContent = errorMessage;
    textInput.focus();
}
