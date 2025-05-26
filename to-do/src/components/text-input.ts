export function createTextInputComponent(): HTMLInputElement {
    const textInput = document.createElement('input');
    textInput.id = 'text-input-id';
    textInput.type = 'text';
    textInput.name = 'text-input';
    textInput.placeholder = 'Write a task...';
    textInput.autocomplete = 'off';
    textInput.required = true;
    textInput.classList.add('shared');

    return textInput;
}
