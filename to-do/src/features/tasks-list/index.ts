export function createTasksList(): HTMLUListElement {
    const ul: HTMLUListElement = document.createElement('ul');

    function appendTasks(): void {
        ul.replaceChildren();
    }

    appendTasks();

    return ul;
}
