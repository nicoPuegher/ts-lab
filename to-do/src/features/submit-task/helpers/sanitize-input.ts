export function sanitizeInput(value: string): string {
    return value.trim().replace(/\s+/g, ' ');
}
