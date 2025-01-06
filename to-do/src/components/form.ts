import { createButtonComponent } from './button.ts';
import { createTextInputComponent } from './text-input.ts';

export function createFormComponent(): HTMLFormElement {
    const form = document.createElement('form');

    form.addEventListener('submit', handleSubmit);

    const textInputComponent = createTextInputComponent();
    const buttonComponent = createButtonComponent('Add');

    form.append(textInputComponent, buttonComponent);

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
}
