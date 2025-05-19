import { createStatusFilter } from '@features/status-filter/index.ts';
import { createTasksFilterSearch } from '@features/tasks-filter-search/index.ts';

export function createFilterLayout(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('filter-layout');

    const statusFilter = createStatusFilter();
    const filterSearch = createTasksFilterSearch();

    container.append(statusFilter, filterSearch);

    return container;
}
