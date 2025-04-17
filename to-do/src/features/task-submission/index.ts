import { createButtonComponent } from '@components/button.ts';
import { createFormComponent } from '@components/form.ts';
import { createLabelComponent } from '@components/label.ts';
import { createTextFeedbackComponent } from '@components/text-feedback.ts';
import { createTextInputComponent } from '@components/text-input.ts';

import { handleInput } from './handlers/handle-input.ts';
import { handleSubmit } from './handlers/handle-submit.ts';

export function createTaskSubmission(): HTMLFormElement {
    const form: HTMLFormElement = createFormComponent();
    const input: HTMLInputElement = createTextInputComponent();
    const label: HTMLLabelElement = createLabelComponent(input.id, 'Todo item');
    const button: HTMLButtonElement = createButtonComponent('Add');
    const feedback: HTMLParagraphElement = createTextFeedbackComponent();

    input.addEventListener('input', (event: InputEvent) => handleInput(event as InputEvent, feedback));
    form.addEventListener('submit', (event: SubmitEvent) => handleSubmit(event as SubmitEvent, form, input, feedback));

    form.append(label, input, button, feedback);

    return form;
}
