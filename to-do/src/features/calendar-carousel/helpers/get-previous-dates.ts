import type { AppState } from '@state/types/index.ts';

const DEFAULT_TIME = 'T00:00:00';

export function getPreviousDates(storedLists: string | null): Date[] {
    if (!storedLists) return [];

    const lists: AppState = JSON.parse(storedLists);

    return Object.keys(lists.todosByDate)
        .map((date) => new Date(date))
        .filter((date) => date < new Date());
}
