import { createButtonComponent } from './button.ts';
import { createTextInputComponent } from './text-input.ts';

export function createFormComponent(): HTMLFormElement {
    const form = document.createElement('form');

    const textInputComponent = createTextInputComponent();
    const buttonComponent = createButtonComponent('Add');

    form.append(textInputComponent, buttonComponent);

    return form;
}
