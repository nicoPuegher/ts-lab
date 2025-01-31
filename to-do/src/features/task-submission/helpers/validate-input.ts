export function validateInput(input: string): string | null {
    const trimmedValue: string = input.trim();

    if (trimmedValue.length === 0) {
        return 'Cannot be empty.';
    }

    if (trimmedValue.length < 3) {
        return 'Must be at least 3 characters long.';
    }

    if (trimmedValue.length > 25) {
        return 'Cannot exceed 25 characters.';
    }

    if (!/^[a-zA-Z0-9\s]+$/.test(trimmedValue)) {
        return 'Only letters, numbers, and spaces allowed.';
    }

    if (/^\d+$/.test(trimmedValue)) {
        return 'Cannot contain only numbers.';
    }

    return null;
}
