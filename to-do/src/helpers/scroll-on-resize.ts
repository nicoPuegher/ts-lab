import { scrollToToday } from '@/helpers/scroll-to-today.ts';

const TIMER = 200;

let resizeWindowEventTimeout: ReturnType<typeof setTimeout> | null = null;

export function scrollOnResize() {
    window.addEventListener('resize', () => {
        if (resizeWindowEventTimeout) {
            clearTimeout(resizeWindowEventTimeout);
        }

        resizeWindowEventTimeout = setTimeout(scrollToToday, TIMER);
    });
}
