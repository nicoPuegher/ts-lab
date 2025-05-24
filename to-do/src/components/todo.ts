import { Trash, createElement } from 'lucide';

import { stateManager } from '@state/index.ts';
import type { Todo } from '@state/types/index.ts';

export function createTodoComponent(todo: Todo): HTMLLIElement {
    const li = document.createElement('li');
    li.id = todo.id;
    li.classList.add('todo', 'surface');
    li.classList.toggle('todo-completed', todo.completed);

    const checkbox = document.createElement('input');
    checkbox.id = `checkbox-${todo.id}`;
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-labelledby', `checkbox-${todo.id}`);
    checkbox.addEventListener('change', (event) => handleCheckboxChange(todo.id, li, event));

    const paragraph = document.createElement('p');
    paragraph.textContent = todo.text;

    const iconContainer = document.createElement('div');
    iconContainer.classList.toggle('removed', todo.completed);
    iconContainer.addEventListener('click', () => handleDeleteTodo(todo.id));

    const icon = createElement(Trash);
    icon.classList.add('todo-icon');

    iconContainer.appendChild(icon);
    li.append(checkbox, paragraph, iconContainer);

    return li;
}

function handleCheckboxChange(id: string, todo: HTMLLIElement, event: Event): void {
    const checkbox = event.target;

    if (!(checkbox instanceof HTMLInputElement)) return;

    if (checkbox.checked) {
        todo.classList.add('todo-completed');
        todo.lastElementChild?.classList.add('removed');
    } else {
        todo.classList.remove('todo-completed');
        todo.lastElementChild?.classList.remove('removed');
    }

    stateManager.toggleTodo(id);
}

function handleDeleteTodo(id: string) {
    const li = document.getElementById(id);

    stateManager.deleteTodo(id);
    li.remove();
}
