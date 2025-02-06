import { createTaskComponent } from '@components/task.ts';

import type { newTodoProps } from '@features/tasks-list/types';

export function setNewTodo(props: newTodoProps): void {
    const li: HTMLLIElement = createTaskComponent(props.todo.id, props.todo.text);
    if (props.todo.completed) {
        li.classList.add('completed');
        li.lastElementChild.classList.add('removed');
    }

    const checkbox: HTMLInputElement = li.querySelector('input[type="checkbox"]');
    checkbox.checked = props.todo.completed;

    props.elementsMap.set(props.todo.id, li);
}
