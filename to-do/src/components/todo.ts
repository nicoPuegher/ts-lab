import { Trash, createElement } from 'lucide';

import { stateManager } from '@state/index.ts';
import type { Todo } from '@state/types/index.ts';

export function createTodoComponent(todo: Todo) {
    const li = document.createElement('li');
    li.id = todo.id;
    li.classList.add('todo', 'clean-input');
    li.classList.toggle('todo-completed', todo.completed);

    const checkbox = document.createElement('input');
    checkbox.id = `checkbox-${todo.id}`;
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-labelledby', `checkbox-${todo.id}`);
    checkbox.addEventListener('change', (event) => handleCheckboxChange(todo.id, li, event));

    const paragraph = document.createElement('p');
    paragraph.textContent = todo.text;
    paragraph.addEventListener('click', (event) => handleParagraphChange(event, todo));

    const icon = createElement(Trash);
    icon.classList.add('icons', 'clickeable', 'trash-icon');
    icon.classList.toggle('hide-element', todo.completed);
    icon.addEventListener('click', () => handleDeleteTodo(todo.id));

    li.append(checkbox, paragraph, icon);

    return li;
}

function createTextInputComponent(todo: Todo, paragraph: HTMLParagraphElement) {
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.value = paragraph.textContent || '';
    textInput.classList.add('todo-edit');

    textInput.addEventListener('blur', (event) => handleTextInputBlur(todo, event, paragraph));
    textInput.addEventListener('keydown', (event) => handleTextInputKeydown(todo, event, paragraph));

    paragraph.replaceWith(textInput);
    textInput.focus();
}

function handleCheckboxChange(id: string, todo: HTMLLIElement, event: Event) {
    const checkbox = event.target;

    if (!(checkbox instanceof HTMLInputElement)) return;

    todo.classList.toggle('todo-completed', checkbox.checked);
    todo.lastElementChild?.classList.toggle('hide-element', checkbox.checked);

    stateManager.toggleTodo(id);
}

function handleParagraphChange(event: MouseEvent, todo: Todo) {
    if (!(event.target instanceof HTMLParagraphElement)) return;

    if (!(event.target.parentElement instanceof HTMLLIElement)) return;

    if (event.target.parentElement.classList.contains('todo-completed')) return;

    createTextInputComponent(todo, event.target);
}

function handleTextInputBlur(todo: Todo, event: FocusEvent, paragraph: HTMLParagraphElement) {
    if (!(event.target instanceof HTMLInputElement)) return;

    paragraph.textContent = event.target.value;
    event.target.replaceWith(paragraph);
}

function handleDeleteTodo(id: string) {
    const li = document.getElementById(id);

    if (!li) return;

    stateManager.deleteTodo(id);
    li.remove();
}
