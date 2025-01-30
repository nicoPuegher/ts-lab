import { stateManager } from '@state/index.ts';

import { createTaskComponent } from '@components/task.ts';

export function createTasksList(): HTMLUListElement {
    const ul: HTMLUListElement = document.createElement('ul');

    function appendTasks(): void {
        const { todos } = stateManager.getState();

        ul.replaceChildren();

        todos.forEach((todo) => {
            const task = createTaskComponent(todo.id, todo.text);

            const checkbox: HTMLInputElement = task.querySelector('input[type="checkbox"]');
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => stateManager.toggleTodo(todo.id));

            ul.appendChild(task);
        });
    }

    stateManager.subscribe(appendTasks);
    appendTasks();

    return ul;
}
