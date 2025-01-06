export function createTextInputComponent(): HTMLInputElement {
    const textInput = document.createElement('input');

    textInput.type = 'text';
    textInput.name = 'textInput';
    textInput.placeholder = 'Write a task...';

    return textInput;
}
