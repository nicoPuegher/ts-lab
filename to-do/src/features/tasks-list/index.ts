import { stateManager } from '@state/index.ts';
import type { Todo } from '@state/types';

import { createTaskComponent } from '@components/task.ts';

export function createTasksList(): HTMLUListElement {
    const ul: HTMLUListElement = document.createElement('ul');

    function appendTasks(): void {
        const { todos }: { todos: Todo[] } = stateManager.getState();
    }

    stateManager.subscribe(appendTasks);
    appendTasks();

    return ul;
}
