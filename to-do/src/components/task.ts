export function createTaskComponent(id: string, description: string): HTMLDivElement {
    const div = document.createElement('div');

    div.className = 'task';

    return div;
}
