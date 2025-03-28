import { stateManager } from '@state/index.ts';
import type { Todo } from '@state/types/index.ts';
import { Trash, createIcons } from 'lucide';

export function createTaskComponent(todo: Todo): HTMLLIElement {
    const li: HTMLLIElement = document.createElement('li');
    li.id = todo.id;
    li.classList.add('task', 'shared');

    const checkbox: HTMLInputElement = document.createElement('input');
    checkbox.id = `checkbox-${todo.id}`;
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-labelledby', `checkbox-${todo.id}`);
    checkbox.addEventListener('change', (event: Event) => handleChange(todo.id, li, event));

    const paragraph: HTMLParagraphElement = document.createElement('p');
    paragraph.textContent = todo.text;

    const iconContainer: HTMLDivElement = document.createElement('div');
    iconContainer.addEventListener('click', () => handleClick(id));

    const icon: HTMLElement = document.createElement('i');
    icon.classList.add('icon');
    icon.setAttribute('data-lucide', 'trash');

    iconContainer.appendChild(icon);
    li.append(checkbox, paragraph, iconContainer);
    setTimeout(() => createIcons({ icons: { Trash } }), 0);

    return li;
}

function handleChange(id: string, task: HTMLLIElement, event: Event): void {
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

function handleClick(id: string) {
    stateManager.deleteTodo(id);
}
