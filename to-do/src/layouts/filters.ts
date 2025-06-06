import { createSearchFilter } from '@features/search-filter/index.ts';
import { createStatusFilter } from '@features/status-filter/index.ts';

export function createFilterLayout() {
    const container = document.createElement('div');
    container.classList.add('filter-layout');

    const statusFilter = createStatusFilter();
    const searchFilter = createSearchFilter();

    container.append(statusFilter, searchFilter);

    return container;
}
