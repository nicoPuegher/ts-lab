import { createButtonComponent } from '@components/button.ts';
import { createTextInputComponent } from '@components/text-input.ts';

import './styles/globals.css';

const app = document.querySelector<HTMLDivElement>('#app');

const textInputComponent = createTextInputComponent();
const buttonComponent = createButtonComponent('Add');

if (app) {
    app.appendChild(textInputComponent);
    app.appendChild(buttonComponent);
}
