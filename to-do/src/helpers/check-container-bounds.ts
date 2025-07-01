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
        props.axis === 'horizontal'
            ? Math.floor(firstRect.left) >= Math.floor(containerRect.left)
            : Math.floor(firstRect.top) >= Math.floor(containerRect.top);

    const endVisible =
        props.axis === 'horizontal' ? lastRect.right <= containerRect.right : lastRect.bottom <= containerRect.bottom;

    props.container.classList.toggle(props.startClass, startVisible);
    props.container.classList.toggle(props.endClass, endVisible);
}
