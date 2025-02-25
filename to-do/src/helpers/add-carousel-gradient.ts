export function addCarouselGradient() {
    let isScrolling = false;

    document.addEventListener('DOMContentLoaded', () => {
        const carousel = document.querySelector('.calendar-carousel');

        carousel.addEventListener('scroll', () => {
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
    const carousel: HTMLDivElement = document.querySelector('.calendar-carousel');

    const scrollLeft = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const fadeDistance = 30;

    const leftFade = Math.min((scrollLeft / fadeDistance) * 10, 10);
    carousel.style.setProperty('--left-fade', `${leftFade}%`);

    const remainingScroll = maxScroll - scrollLeft;
    const rightFade = Math.min((remainingScroll / fadeDistance) * 10, 10);
    carousel.style.setProperty('--right-fade', `${rightFade}%`);
}
