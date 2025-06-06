import { scrollOnResize } from '@/helpers/scroll-on-resize.ts';
import { scrollToToday } from '@/helpers/scroll-to-today.ts';
import { createFilterLayout } from '@/layouts/filters.ts';

import { createDatePicker } from '@features/date-picker/index.ts';
import { createTodoList } from '@features/todo-list/index.ts';
import { createTodoSubmission } from '@features/todo-submission/index.ts';

import './styles/globals.css';

const rootElement = document.querySelector('#root');
if (!rootElement) throw new Error('The #root element does not exist.');

rootElement.append(createDatePicker(), createFilterLayout(), createTodoList(), createTodoSubmission());

scrollToToday();
scrollOnResize();
