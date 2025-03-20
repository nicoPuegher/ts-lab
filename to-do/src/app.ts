import { addCarouselGradient } from '@/helpers/add-carousel-gradient.ts';
import { scrollToToday } from '@/helpers/scroll-to-today.ts';

import { createCalendarCarousel } from '@features/calendar-carousel/index.ts';
import { createTaskFilter } from '@features/task-filter/index.ts';
import { createTaskSubmission } from '@features/task-submission/index.ts';
import { createTasksList } from '@features/tasks-list/index.ts';

import './styles/globals.css';

const app = document.querySelector<HTMLDivElement>('#app');

app.appendChild(createCalendarCarousel());
scrollToToday();
addCarouselGradient();
app.appendChild(createTaskFilter());
app.appendChild(createTasksList());
app.appendChild(createTaskSubmission());

let resizeTimeout: number;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(scrollToToday, 200);
});
