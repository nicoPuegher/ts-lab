import type { Todo } from '@state/types/index.ts';

type updateExistingTodoProps = {
    existingLi: HTMLLIElement;
    currentTodos: Todo[];
    todo: Todo;
};

export function updateExistingTodo(props: updateExistingTodoProps): void {
    const oldTodo: Todo = props.currentTodos.find((currentTodo) => currentTodo.id === props.todo.id);

    if (oldTodo) {
        const checkbox: HTMLInputElement = props.existingLi.querySelector('input[type="checkbox"]');
        const paragraph: HTMLParagraphElement = props.existingLi.querySelector('p');

        if (oldTodo.text != props.todo.text) {
            paragraph.textContent = props.todo.text;
        }

        if (oldTodo.completed != props.todo.completed) {
            checkbox.checked = props.todo.completed;
            props.existingLi.classList.toggle('completed', props.todo.completed);
            props.existingLi.lastElementChild.classList.toggle('removed', props.todo.completed);
        }
    }
}
