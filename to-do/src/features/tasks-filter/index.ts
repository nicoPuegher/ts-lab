import { createButtonComponent } from '@components/button.ts';

export function createTasksFilter(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('filters-container');

    const allButton = createButtonComponent('All', 'filter');
    const activeButton = createButtonComponent('Active', 'filter');
    const completedButton = createButtonComponent('Completed', 'filter');

    return container;
}
