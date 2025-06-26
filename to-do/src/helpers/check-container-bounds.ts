export type ContainerBounds = {
    container: HTMLDivElement | HTMLUListElement;
    axis: 'horizontal' | 'vertical';
    startClass: 'at-start' | 'at-top';
    endClass: 'at-end' | 'at-bottom';
};

export function checkContainerBounds(props: ContainerBounds) {
    const { firstElementChild, lastElementChild } = props.container;

    if (!firstElementChild || !lastElementChild) return;

    const containerRect = props.container.getBoundingClientRect();
    const firstRect = firstElementChild.getBoundingClientRect();
    const lastRect = lastElementChild.getBoundingClientRect();

    const startVisible =
        props.axis === 'horizontal' ? firstRect.left >= containerRect.left : firstRect.top >= containerRect.top;

    const endVisible =
        props.axis === 'horizontal' ? lastRect.right <= containerRect.right : lastRect.bottom <= containerRect.bottom;

    props.container.classList.toggle(props.startClass, startVisible);
    props.container.classList.toggle(props.endClass, endVisible);
}
