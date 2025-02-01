import { createIcons, icons } from 'lucide';

export function createTaskComponent(id: string, description: string): HTMLDivElement {
    const div: HTMLDivElement = document.createElement('div');
    div.classList.add('task', 'shared');

    const checkbox: HTMLInputElement = document.createElement('input');
    checkbox.id = id;
    checkbox.type = 'checkbox';
    checkbox.checked = false;
    checkbox.setAttribute('aria-labelledby', `label-${id}`);
    checkbox.addEventListener('change', (event: Event) => handleChange(div, event));

    const paragraph: HTMLParagraphElement = document.createElement('p');
    paragraph.id = `label-${id}`;
    paragraph.textContent = description;

    div.append(checkbox, paragraph);

    return div;
}

function handleChange(task: HTMLDivElement, event: Event): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
        task.classList.add('completed');
    } else {
        task.classList.remove('completed');
    }
}
