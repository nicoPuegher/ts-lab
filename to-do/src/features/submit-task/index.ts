import { createButtonComponent } from '@components/button.ts';
import { createFormComponent } from '@components/form.ts';
import { createTextFeedbackComponent } from '@components/text-feedback.ts';
import { createTextInputComponent } from '@components/text-input.ts';

export function SubmitTask() {
    const form = createFormComponent();
    const input = createTextInputComponent();
    const button = createButtonComponent('Add');
    const feedback = createTextFeedbackComponent();
}
