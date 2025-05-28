import { createButtonComponent } from '@components/button.ts';
import { createErrorMessageComponent } from '@components/error-message.ts';
import { createFormComponent } from '@components/form.ts';
import { createLabelComponent } from '@components/label.ts';
import { createTextInputComponent } from '@components/text-input.ts';

export function createTodoSubmission() {
    const form = createFormComponent();
    const input = createTextInputComponent();
    const label = createLabelComponent(input.id, 'Todo item');
    const button = createButtonComponent('Add');
    const errorMessage = createErrorMessageComponent();

    input.addEventListener('input', () => handleClearValidationFeedback(feedbackElement));
    form.addEventListener('submit', (event: SubmitEvent) =>
        handleTodoSubmit(event as SubmitEvent, form, input, feedbackElement),
    );

    form.append(label, input, button, feedbackElement);

    return form;
}

function handleClearValidationFeedback(validationFeedback: HTMLParagraphElement) {
    validationFeedback.textContent = '';
}

function handleTodoSubmit(
    event: SubmitEvent,
    form: HTMLFormElement,
    input: HTMLInputElement,
    feedbackElement: HTMLParagraphElement,
) {
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

function showErrorMessage(textInput: HTMLInputElement, errorElement: HTMLParagraphElement, errorMessage: string){
    errorElement.textContent = errorMessage;
    textInput.focus();
}
