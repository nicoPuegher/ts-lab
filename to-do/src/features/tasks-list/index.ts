import { stateManager } from '@state/index.ts';
import type { Todo } from '@state/types';

import { createTaskComponent } from '@components/task.ts';

export function createTasksList(): HTMLUListElement {
    const ul: HTMLUListElement = document.createElement('ul');

    function appendTasks(): void {
        const { todos }: { todos: Todo[] } = stateManager.getState();

        if (todos.length > ul.children.length) {
            const newTodo = todos.at(-1);
            const task: HTMLLIElement = createTaskComponent(newTodo.id, newTodo.text);

            ul.appendChild(task);
        }
    }

    stateManager.subscribe(appendTasks);
    appendTasks();

    return ul;
}
