import { stateManager } from '@state/index.ts';
import type { Todo } from '@state/types/index.ts';

import { processTodos } from '@features/tasks-list/helpers/process-todos.ts';
import { removeIds } from '@features/tasks-list/helpers/remove-ids.ts';
import { scrollToLast } from '@features/tasks-list/helpers/scroll-to-last.ts';

export function createTasksList(): HTMLUListElement {
    const ul = document.createElement('ul');

    stateManager.subscribeStateChange((newTodo?: Todo) => appendTasks(ul, newTodo));

    return ul;
}
