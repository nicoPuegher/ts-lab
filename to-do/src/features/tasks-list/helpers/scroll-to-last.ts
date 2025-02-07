export function scrollToLast(ul: HTMLUListElement): void {
    const lastTask = ul.lastElementChild as HTMLLIElement;

    if (lastTask) lastTask.scrollIntoView({ behavior: 'smooth' });
}
