export function createTaskComponent(id: string, description: string): HTMLDivElement {
    const div = document.createElement('div');

    div.className = 'task';

    const checkbox = document.createElement('input');

    checkbox.id = id;
    checkbox.type = 'checkbox';
    checkbox.checked = false;
    checkbox.setAttribute('aria-labelledby', `label-${id}`);

    const paragraph = document.createElement('p');

    paragraph.id = `label-${id}`;
    paragraph.textContent = description;

    div.append(checkbox, paragraph);

    return div;
}
