import { formatDate } from '@/utils/format-date.ts';

export function scrollToToday() {
    const todayDateContainer = document.getElementById(formatDate(new Date()));

    if (!(todayDateContainer instanceof HTMLDivElement)) return;

    todayDateContainer.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
}
