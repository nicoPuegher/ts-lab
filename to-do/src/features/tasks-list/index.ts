import { stateManager } from '@state/index.ts';
import type { Todo } from '@state/types';

import { createTaskComponent } from '@components/task.ts';

export function createTasksList(): HTMLUListElement {
    const elementsMap = new Map<string, HTMLLIElement>();
    let currentTodos: Todo[] = [];

    const ul: HTMLUListElement = document.createElement('ul');

    function appendTasks(): void {
        const { todos: newTodos }: { todos: Todo[] } = stateManager.getState();

        const currentIds = new Set<string>(currentTodos.map((currentTodo) => currentTodo.id));
        const newIds = new Set<string>(newTodos.map((newTodo) => newTodo.id));

        const idsToRemove: string[] = Array.from(currentIds).filter((id) => !newIds.has(id));
        idsToRemove.forEach((id) => {
            const li: HTMLLIElement = elementsMap.get(id);
            if (li) {
                li.remove();
                elementsMap.delete(id);
            }
        });

        newTodos.forEach((todo) => {
            const existingLi: HTMLLIElement = elementsMap.get(todo.id);

            if (existingLi) {
                const oldTodo: Todo = currentTodos.find((currentTodo) => currentTodo.id === todo.id);

                if (oldTodo) {
                    const checkbox: HTMLInputElement = existingLi.querySelector('input[type="checkbox"]');
                    const paragraph: HTMLParagraphElement = existingLi.querySelector('p');

                    if (oldTodo.text != todo.text) {
                        paragraph.textContent = todo.text;
                    }

                    if (oldTodo.completed != todo.completed) {
                        checkbox.checked = todo.completed;
                        existingLi.classList.toggle('completed', todo.completed);
                        existingLi.lastElementChild.classList.toggle('removed', todo.completed);
                    }
                }
            } else {
                const li: HTMLLIElement = createTaskComponent(todo.id, todo.text);
                if (todo.completed) {
                    li.classList.add('completed');
                    li.lastElementChild.classList.add('removed');
                }
            }
        });
    }

    stateManager.subscribe(appendTasks);
    appendTasks();

    return ul;
}
