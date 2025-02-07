import { stateManager } from '@state/index.ts';
import type { Todo } from '@state/types/index.ts';

import { processTodos } from '@features/tasks-list/helpers/process-todos.ts';
import { removeIds } from '@features/tasks-list/helpers/remove-ids.ts';
import { scrollToLast } from '@features/tasks-list/helpers/scroll-to-last.ts';

export function createTasksList(): HTMLUListElement {
    const elementsMap = new Map<string, HTMLLIElement>();
    // eslint-disable-next-line prefer-const
    let currentTodos: Todo[] = [];

    const ul: HTMLUListElement = document.createElement('ul');

    function appendTasks(): void {
        const { todos: newTodos }: { todos: Todo[] } = stateManager.getState();

        removeIds({ elementsMap, currentTodos, newTodos });
        processTodos({ elementsMap, currentTodos, newTodos, ul });
        scrollToLast(ul);
    }

    stateManager.subscribe(appendTasks);
    appendTasks();

    return ul;
}
