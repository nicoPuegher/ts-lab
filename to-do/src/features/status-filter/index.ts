import { stateManager } from '@state/index.ts';

import { createButtonComponent } from '@components/button.ts';

type FocusState = {
    currentFocusIndex: number | null;
};

const filter = {
    ALL: 'All',
    ACTIVE: 'Active',
    COMPLETED: 'Completed',
};

export function createStatusFilter() {
    const focusState: FocusState = {
        currentFocusIndex: null,
    };

    const container = document.createElement('div');
    container.setAttribute('role', 'toolbar');
    container.setAttribute('aria-label', 'Filter to-dos by status');
    container.setAttribute('tabindex', '0');
    container.classList.add('status-filter', 'focusable');

    const all = createFilterButtonComponent(filter.ALL, filter.ALL.toLowerCase());
    const active = createFilterButtonComponent(filter.ACTIVE, filter.ACTIVE.toLowerCase());
    const completed = createFilterButtonComponent(filter.COMPLETED, filter.COMPLETED.toLowerCase());

    container.append(all, active, completed);
    container.addEventListener('keydown', (event) => handleKeydown(event, focusState));

    return container;
}

function createFilterButtonComponent(label: string, status: string) {
    const selectedFilterFromState = stateManager.getState().selectedFilter;

    const button = createButtonComponent(label, 'secondary');
    button.id = status;
    button.addEventListener('click', () => {
        button.classList.remove('secondary');
        button.classList.add('primary');

        if (status == 'all' || status == 'active' || status == 'completed') {
            stateManager.setFilter(status);
        }
    });

    if (selectedFilterFromState == status) {
        button.classList.remove('secondary');
        button.classList.add('primary');
    }

    return button;
}
