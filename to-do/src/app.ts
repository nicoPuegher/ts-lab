import { addCarouselGradient } from '@/helpers/add-carousel-gradient.ts';
import { scrollToToday } from '@/helpers/scroll-to-today.ts';
import { createTodoFiltersLayout } from '@/layouts/todo-filters.ts';

import { createCalendarCarousel } from '@features/calendar-carousel/index.ts';
import { createTaskSubmission } from '@features/task-submission/index.ts';
import { createTasksList } from '@features/tasks-list/index.ts';

import './styles/globals.css';

const rootElement = document.querySelector('#root');
if (!rootElement) throw new Error('The #root element does not exist.');

rootElement.appendChild(createCalendarCarousel());
scrollToToday();
addCarouselGradient();
rootElement.appendChild(createTodoFiltersLayout());
rootElement.appendChild(createTasksList());
rootElement.appendChild(createTaskSubmission());

let resizeTimeout: number;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(scrollToToday, 200);
});
