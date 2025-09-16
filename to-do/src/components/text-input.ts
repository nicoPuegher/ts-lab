export function createTextInputComponent() {
    const textInput = document.createElement('input');
    textInput.id = 'text-input-id';
    textInput.setAttribute('type', 'text');
    textInput.setAttribute('name', 'text-input');
    textInput.setAttribute('placeholder', 'Write a to-do...');
    textInput.setAttribute('autocomplete', 'off');
    textInput.setAttribute('tabindex', '-1');
    textInput.classList.add('clean-input', 'focusable');

    return textInput;
}
