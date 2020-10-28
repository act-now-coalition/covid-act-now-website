export function scrollWithOffset(element: HTMLElement, offset: number) {
  const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({ top: yCoordinate + offset, behavior: 'smooth' });
}
