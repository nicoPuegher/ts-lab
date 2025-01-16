import { submitTaskFeature } from '@features/submit-task/index.ts';

import './styles/globals.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
    app.appendChild(submitTaskFeature());
}
