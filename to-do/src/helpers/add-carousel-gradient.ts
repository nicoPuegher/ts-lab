export function addDatePickerOutOfBoundGradient() {
    let isScrolling = false;

    document.addEventListener('DOMContentLoaded', () => {
        const datePicker = document.querySelector('.date-picker');

        if (!(datePicker instanceof HTMLDivElement)) return;

        datePicker.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    updateScrollState();
                    isScrolling = false;
                });

                isScrolling = true;
            }
        });

        window.addEventListener('resize', updateScrollState);
        updateScrollState();
    });
}

function updateScrollState() {
    const datePicker = document.querySelector('.date-picker');

    if (!(datePicker instanceof HTMLDivElement)) return;

    const scrollLeft = datePicker.scrollLeft;
    const maxScroll = datePicker.scrollWidth - datePicker.clientWidth;
    const fadeDistance = 30;

    const leftFade = Math.min((scrollLeft / fadeDistance) * 10, 10);
    datePicker.style.setProperty('--left-fade', `${leftFade}%`);

    const remainingScroll = maxScroll - scrollLeft;
    const rightFade = Math.min((remainingScroll / fadeDistance) * 10, 10);
    datePicker.style.setProperty('--right-fade', `${rightFade}%`);
}
