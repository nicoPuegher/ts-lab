import { addCarouselGradient } from '@/helpers/add-carousel-gradient.ts';
import { scrollToToday } from '@/helpers/scroll-to-today.ts';
import { Search, Trash, X, createIcons } from 'lucide';

import { createCalendarCarousel } from '@features/calendar-carousel/index.ts';
import { createTaskSubmission } from '@features/task-submission/index.ts';
import { createTasksList } from '@features/tasks-list/index.ts';

import './styles/globals.css';

const app = document.querySelector<HTMLDivElement>('#app');

app.appendChild(createCalendarCarousel());
scrollToToday();
addCarouselGradient();
app.appendChild(createTasksFilter());
app.appendChild(createTasksList());
app.appendChild(createTaskSubmission());

createIcons({ icons: { Search, X, Trash } });

let resizeTimeout: number;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(scrollToToday, 200);
});
