import { createButtonComponent } from './button.ts';
import { createTextFeedbackComponent } from './text-feedback.ts';
import { createTextInputComponent } from './text-input.ts';

export function createFormComponent(): HTMLFormElement {
    const form = document.createElement('form');

    const textInputComponent = createTextInputComponent();
    const buttonComponent = createButtonComponent('Add');
    const textFeedbackComponent = createTextFeedbackComponent('');

    form.append(textInputComponent, buttonComponent, textFeedbackComponent);
    form.addEventListener('submit', (event) => handleSubmit(event, textInputComponent, textFeedbackComponent));

    return form;
}

function handleSubmit(
    event: SubmitEvent,
    textInputComponent: HTMLInputElement,
    textFeedbackComponent: HTMLParagraphElement,
): void {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const textInputValue = formData.get('textInput') as string;

    // TODO: Move validation somewhere else
    const trimmedValue = textInputValue.trim();

    if (trimmedValue.length == 0) {
        textInputComponent.focus();
        textFeedbackComponent.textContent = 'Cannot be empty.';
        return;
    }

    if (trimmedValue.length < 3) {
        textInputComponent.focus();
        textFeedbackComponent.textContent = 'Must be at least 3 characters long.';
        return;
    }

    if (trimmedValue.length > 25) {
        textInputComponent.focus();
        textFeedbackComponent.textContent = 'Cannot exceed 25 characters.';
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
