export function scrollToToday() {
    const todayDateContainer = document.getElementById(new Date().toLocaleDateString());

    if (!(todayDateContainer instanceof HTMLDivElement)) return;

    todayDateContainer.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
}
