export function scrollToToday(): void {
    const today = document.getElementById(new Date().toLocaleDateString());
    today.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
}
