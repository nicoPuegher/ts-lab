export function createCalendarCarousel(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('calendar-carousel');

    function generateWeek() {
        const weekDays = 7;

        return Array.from({ length: weekDays }, (_, i) => {
            const date = new Date();
            const newDay = date.getDate() + i;
            date.setDate(newDay);

            return date;
        });
    }

    return container;
}
