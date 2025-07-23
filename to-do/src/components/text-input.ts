export function createTextInputComponent() {
    const textInput = document.createElement('input');
    textInput.id = 'text-input-id';
    textInput.type = 'text';
    textInput.name = 'text-input';
    textInput.placeholder = 'Write a to-do...';
    textInput.autocomplete = 'off';
    textInput.classList.add('clean-input');

    return textInput;
}
