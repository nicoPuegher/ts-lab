import { createIcons, icons } from 'lucide';

export function createTaskComponent(id: string, description: string): HTMLLIElement {
    const li: HTMLLIElement = document.createElement('li');
    li.classList.add('task', 'shared');

    const checkbox: HTMLInputElement = document.createElement('input');
    checkbox.id = `checkbox-${id}`;
    checkbox.type = 'checkbox';
    checkbox.checked = false;
    checkbox.setAttribute('aria-labelledby', `checkbox-${id}`);
    checkbox.addEventListener('change', (event: Event) => handleChange(li, event));

    const paragraph: HTMLParagraphElement = document.createElement('p');
    paragraph.textContent = description;

    const icon: HTMLElement = document.createElement('i');
    icon.classList.add('icon');
    icon.setAttribute('data-lucide', 'trash');

    li.append(checkbox, paragraph, icon);
    setTimeout(() => createIcons({ icons }), 0);

    return li;
}

function handleChange(task: HTMLLIElement, event: Event): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
        task.classList.add('completed');
        task.lastElementChild.classList.add('removed');
    } else {
        task.classList.remove('completed');
        task.lastElementChild.classList.remove('removed');
    }
}
