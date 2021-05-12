/* Determines whether or not you've scrolled past a specified y position */

import { useEffect, useState } from 'react';

export default function useShowPastPosition(y: number): boolean {
  const [pastPosition, setPastPosition] = useState<boolean>(false);
  useEffect(() => {
    const onScroll = () => {
      let currentPosition = window.pageYOffset;
      if (currentPosition > y) {
        setPastPosition(true);
      } else {
        setPastPosition(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [y]);

  return pastPosition;
}
