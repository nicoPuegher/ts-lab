import { stateManager } from '@state/index.ts';

import { createButtonComponent } from '@components/button.ts';

export function createTasksFilter(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('filters-container');

    const allButton = createButtonComponent('All', 'filter');
    const activeButton = createButtonComponent('Active', 'filter');
    const completedButton = createButtonComponent('Completed', 'filter');

    allButton.addEventListener('click', () => stateManager.setFilter('all'));
    activeButton.addEventListener('click', () => stateManager.setFilter('active'));
    completedButton.addEventListener('click', () => stateManager.setFilter('completed'));

    return container;
}
