import { Trash, createElement } from 'lucide';

import { stateManager } from '@state/index.ts';
import type { Todo } from '@state/types/index.ts';

export function createTaskComponent(todo: Todo): HTMLLIElement {
    const li: HTMLLIElement = document.createElement('li');
    li.id = todo.id;
    li.classList.add('task', 'shared');
    li.classList.toggle('completed', todo.completed);

    const checkbox: HTMLInputElement = document.createElement('input');
    checkbox.id = `checkbox-${todo.id}`;
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-labelledby', `checkbox-${todo.id}`);
    checkbox.addEventListener('change', (event: Event) => handleCheckboxChange(todo.id, li, event));

    const paragraph: HTMLParagraphElement = document.createElement('p');
    paragraph.textContent = todo.text;

    const iconContainer: HTMLDivElement = document.createElement('div');
    iconContainer.addEventListener('click', () => handleDeleteTodo(todo.id));
    iconContainer.classList.toggle('removed', todo.completed);
    const icon = createElement(Trash);
    icon.classList.add('icon');

    iconContainer.appendChild(icon);
    li.append(checkbox, paragraph, iconContainer);

    return li;
}

function handleCheckboxChange(id: string, task: HTMLLIElement, event: Event): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
        task.classList.add('completed');
        task.lastElementChild.classList.add('removed');
    } else {
        task.classList.remove('completed');
        task.lastElementChild.classList.remove('removed');
    }

    stateManager.toggleTodo(id);
}

function handleDeleteTodo(id: string) {
    const li = document.getElementById(id);

    stateManager.deleteTodo(id);
    li.remove();
}
