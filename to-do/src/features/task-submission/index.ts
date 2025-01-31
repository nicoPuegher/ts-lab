import { createButtonComponent } from '@components/button.ts';
import { createFormComponent } from '@components/form.ts';
import { createTextFeedbackComponent } from '@components/text-feedback.ts';
import { createTextInputComponent } from '@components/text-input.ts';

import { handleInput } from './handlers/handle-input.ts';
import { handleSubmit } from './handlers/handle-submit.ts';

export function createTaskSubmission() {
    const form = createFormComponent();
    const input = createTextInputComponent();
    const button = createButtonComponent('Add');
    const feedback = createTextFeedbackComponent();

    input.addEventListener('input', (event) => handleInput(event as InputEvent, feedback));
    form.addEventListener('submit', (event) => handleSubmit(event, form, input, feedback));

    form.append(input, button, feedback);

    return form;
}
