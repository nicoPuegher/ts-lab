export function createTaskComponent(id: string, description: string): HTMLDivElement {
    const div = document.createElement('div');

    div.className = 'task';

    const checkbox = document.createElement('input');

    checkbox.id = id;
    checkbox.type = 'checkbox';
    checkbox.checked = false;
    checkbox.setAttribute('aria-labelledby', `label-${id}`);

    return div;
}
