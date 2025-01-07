import { createButtonComponent } from './button.ts';
import { createTextFeedbackComponent } from './text-feedback.ts';
import { createTextInputComponent } from './text-input.ts';

export function createFormComponent(): HTMLFormElement {
    const form = document.createElement('form');

    form.addEventListener('submit', handleSubmit);

    const textInputComponent = createTextInputComponent();
    const buttonComponent = createButtonComponent('Add');
    const textFeedbackComponent = createTextFeedbackComponent('');

    form.append(textInputComponent, buttonComponent, textFeedbackComponent);

    return form;
}

function handleSubmit(event: SubmitEvent): void {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const textInputValue = formData.get('textInput') as string;

    // TODO: Move validation somewhere else
    const trimmedValue = textInputValue.trim();

    if (trimmedValue.length == 0) {
        console.error('Task description cannot be empty.');
        return;
    }

    if (trimmedValue.length < 3) {
        console.error('Task description must be at least 3 characters long.');
        return;
    }

    if (trimmedValue.length > 25) {
        console.error('Task description cannot exceed 25 characters.');
        return;
    }

    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(trimmedValue)) {
        console.error('Task description can only contain letters, numbers, and spaces.');
        return;
    }

    // TODO: Submit data to the application's state
    const sanitizedValue = trimmedValue.replace(/\s+/g, ' ');
    console.log(sanitizedValue);
}
