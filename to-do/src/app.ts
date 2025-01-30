import { submitTaskFeature } from '@features/submit-task/index.ts';
import { createTasksList } from '@features/tasks-list/index.ts';

import './styles/globals.css';

const app = document.querySelector<HTMLDivElement>('#app');

app.appendChild(createTasksList());
app.appendChild(submitTaskFeature());
