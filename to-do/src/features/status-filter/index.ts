import { stateManager } from '@state/index.ts';

import { createButtonComponent } from '@components/button.ts';

export function createStatusFilter(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('status-filter');

    const allButton = createButtonComponent('All', 'filter');
    const activeButton = createButtonComponent('Active', 'filter');
    const completedButton = createButtonComponent('Completed', 'filter');

    allButton.addEventListener('click', () => stateManager.setFilter('all'));
    activeButton.addEventListener('click', () => stateManager.setFilter('active'));
    completedButton.addEventListener('click', () => stateManager.setFilter('completed'));

    container.append(allButton, createSeparator(), activeButton, createSeparator(), completedButton);

    return container;
}

function createFilterButtonComponent(label: string, status: string): HTMLButtonElement {
    const button = createButtonComponent(label, 'filter');
    button.addEventListener('click', () => stateManager.setFilter(status));

    return button;
}

function createSeparator(): HTMLSpanElement {
    const separator = document.createElement('span');
    separator.textContent = '|';

    return separator;
}
