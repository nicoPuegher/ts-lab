import { createButtonComponent } from '@components/button.ts';
import { createFormComponent } from '@components/form.ts';
import { createLabelComponent } from '@components/label.ts';
import { createTextFeedbackComponent } from '@components/text-feedback.ts';
import { createTextInputComponent } from '@components/text-input.ts';

import { handleSubmit } from './handlers/handle-submit.ts';

export function createTaskSubmission(): HTMLFormElement {
    const form = createFormComponent();
    const input = createTextInputComponent();
    const label = createLabelComponent(input.id, 'Todo item');
    const button = createButtonComponent('Add');
    const feedbackElement = createTextFeedbackComponent();

    input.addEventListener('input', () => handleClearValidationFeedback(feedbackElement));
    form.addEventListener('submit', (event: SubmitEvent) =>
        handleSubmit(event as SubmitEvent, form, input, feedbackElement),
    );

    form.append(label, input, button, feedbackElement);

    return form;
}

function handleClearValidationFeedback(validationFeedback: HTMLParagraphElement): void {
    validationFeedback.textContent = '';
}
