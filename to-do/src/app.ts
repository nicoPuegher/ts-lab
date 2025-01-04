import { createFormComponent } from '@components/form.ts';

import './styles/globals.css';

const app = document.querySelector<HTMLDivElement>('#app');

const formComponent = createFormComponent();

if (app) {
    app.appendChild(formComponent);
}
