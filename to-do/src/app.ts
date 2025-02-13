import { createCalendarCarousel } from '@features/calendar-carousel/index.ts';
import { createTaskSubmission } from '@features/task-submission/index.ts';
import { createTasksList } from '@features/tasks-list/index.ts';

import './styles/globals.css';

const app = document.querySelector<HTMLDivElement>('#app');

app.appendChild(createCalendarCarousel());
app.appendChild(createTasksList());
app.appendChild(createTaskSubmission());
