import { stateManager } from '@state/index.ts';

import { createButtonComponent } from '@components/button.ts';
import { createErrorComponent } from '@components/error.ts';
import { createFormComponent } from '@components/form.ts';
import { createLabelComponent } from '@components/label.ts';
import { createTextInputComponent } from '@components/text-input.ts';

import type { FocusState } from '@features/types/index.ts';

export function createTodoSubmission() {
    const focusState: FocusState = {
        currentFocusIndex: null,
    };

    const form = createFormComponent();
    form.setAttribute('aria-label', 'Add todo item');

    const input = createTextInputComponent();
    input.setAttribute('aria-required', 'true');
    input.setAttribute('aria-invalid', 'false');
    input.setAttribute('maxlength', '25');

    const label = createLabelComponent(input.id, 'Todo item');

    const button = createButtonComponent('Add');
    button.setAttribute('type', 'submit');

    const errorElement = createErrorComponent();
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'polite');
    errorElement.setAttribute('aria-atomic', 'true');

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

    const formData = new FormData(event.target);
    const userInput = formData.get(input.name);

    if (typeof userInput != 'string') return;

    const errorMessage = validateTodoText(userInput);
    if (errorMessage) {
        showErrorMessage(input, errorElement, errorMessage);
        return;
    }

    form.reset();
    input.focus();

    submitTodo(sanitizeUserInput(userInput));
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

function sanitizeUserInput(value: string) {
    return value.trim().replace(/\s+/g, ' ');
}

function submitTodo(todo: string) {
    stateManager.addTodo(todo);
}
