export function createTextInputComponent() {
    const textInput = document.createElement('input');
    textInput.id = 'text-input-id';
    textInput.type = 'text';
    textInput.name = 'text-input';
    textInput.placeholder = 'Write a todo...';
    textInput.autocomplete = 'off';
    textInput.required = true;
    textInput.classList.add('surface');

    return textInput;
}
