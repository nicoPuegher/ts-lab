function updateScrollState() {
    const carousel: HTMLDivElement = document.querySelector('.calendar-carousel');

    const scrollLeft = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const fadeDistance = 30;
}
