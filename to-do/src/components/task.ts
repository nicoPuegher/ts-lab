import { createIcons, icons } from 'lucide';

export function createTaskComponent(id: string, description: string): HTMLLIElement {
    const li: HTMLLIElement = document.createElement('li');
    li.classList.add('task', 'shared');

    const checkbox: HTMLInputElement = document.createElement('input');
    checkbox.id = id;
    checkbox.type = 'checkbox';
    checkbox.checked = false;
    checkbox.setAttribute('aria-labelledby', `label-${id}`);
    checkbox.addEventListener('change', (event: Event) => handleChange(li, event));

    const paragraph: HTMLParagraphElement = document.createElement('p');
    paragraph.id = `label-${id}`;
    paragraph.textContent = description;

    const icon: HTMLElement = document.createElement('i');
    icon.setAttribute('data-lucide', 'thas');
    icon.classList.add('icon');

    li.append(checkbox, paragraph, icon);

    return li;
}

function handleChange(task: HTMLLIElement, event: Event): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
        task.classList.add('completed');
    } else {
        task.classList.remove('completed');
    }
}
