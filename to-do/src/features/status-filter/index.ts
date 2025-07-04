import { stateManager } from '@state/index.ts';

import { createButtonComponent } from '@components/button.ts';

const filter = {
    ALL: 'All',
    ACTIVE: 'Active',
    COMPLETED: 'Completed',
};

export function createStatusFilter() {
    const container = document.createElement('div');
    container.classList.add('status-filter');

    const all = createFilterButtonComponent(filter.ALL, filter.ALL.toLowerCase());
    const active = createFilterButtonComponent(filter.ACTIVE, filter.ACTIVE.toLowerCase());
    const completed = createFilterButtonComponent(filter.COMPLETED, filter.COMPLETED.toLowerCase());

    container.append(all, createSeparator(), active, createSeparator(), completed);

    return container;
}

function createFilterButtonComponent(label: string, status: string) {
    const button = createButtonComponent(label, 'filter');
    button.addEventListener('click', () => stateManager.setFilter(status));

    return button;
}

function createSeparator() {
    const separator = document.createElement('span');
    separator.textContent = '|';

    return separator;
}
