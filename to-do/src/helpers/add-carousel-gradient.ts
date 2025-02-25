function updateScrollState() {
    const carousel: HTMLDivElement = document.querySelector('.calendar-carousel');

    const scrollLeft = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const fadeDistance = 30;

    const leftFade = Math.min((scrollLeft / fadeDistance) * 10, 10);
    carousel.style.setProperty('--left-fade', `${leftFade}%`);
}
