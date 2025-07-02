import type { ContainerBounds } from '@/helpers/check-container-bounds.ts';

type ScrollBoundsCallback = (props: ContainerBounds) => void;

export function setupScrollBoundsHandler(callback: ScrollBoundsCallback, props: ContainerBounds) {
    let isScrolling = false;

    function scrollBoundsHandler() {
        if (!isScrolling) {
            isScrolling = true;

            requestAnimationFrame(() => {
                callback(props);
                isScrolling = false;
            });
        }
    }

    props.container.addEventListener('scroll', scrollBoundsHandler);
}
