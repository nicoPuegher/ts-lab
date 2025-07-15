import { formatDate } from '@/utils/format-date.ts';

export function scrollToToday() {
    const todayDateContainer = document.getElementById(formatDate(new Date()));

    if (!(todayDateContainer instanceof HTMLButtonElement)) return;

    todayDateContainer.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
}
