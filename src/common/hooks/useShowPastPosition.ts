/* Determines whether or not you've scrolled past a specified y position */

import useScrollPosition from '@react-hook/window-scroll';

export default function useShowPastPosition(y: number): boolean {
  const scrollY = useScrollPosition();
  if (scrollY > y) {
    return true;
  }
  return false;
}
