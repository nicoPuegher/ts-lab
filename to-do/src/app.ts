import { createTextInputComponent } from '@components/text-input.ts';

import './styles/globals.css';

const app = document.querySelector<HTMLDivElement>('#app');

const textInputComponent = createTextInputComponent();

if (app) {
    app.appendChild(textInputComponent);
}
