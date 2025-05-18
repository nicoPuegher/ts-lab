import { addCarouselGradient } from '@/helpers/add-carousel-gradient.ts';
import { scrollToToday } from '@/helpers/scroll-to-today.ts';
import { createFilterLayout } from '@/layouts/filters.ts';

import { createDatePicker } from '@features/date-picker/index.ts';
import { createTaskSubmission } from '@features/task-submission/index.ts';
import { createTasksList } from '@features/tasks-list/index.ts';

import './styles/globals.css';

const rootElement = document.querySelector('#root');
if (!rootElement) throw new Error('The #root element does not exist.');

rootElement.append(createDatePicker(), createFilterLayout(), createTasksList(), createTaskSubmission());

scrollToToday();
addCarouselGradient();

let resizeTimeout: number;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(scrollToToday, 200);
});
