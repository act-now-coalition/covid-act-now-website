/* Used to control the ScrollToTopButton (ScrollToTopButton.tsx) */

import { useEffect } from 'react';
import useShowPastPosition from './useShowPastPosition';
import useBreakpoint from './useBreakpoint';

export default function useScrollToTopButton(
  showButton: boolean,
  setShowButton: React.Dispatch<React.SetStateAction<boolean>>,
): boolean {
  const isMobile = useBreakpoint(800);
  const isVisible = useShowPastPosition(700);

  useEffect(() => {
    if (isMobile && isVisible) {
      setShowButton(true);
    } else setShowButton(false);
  }, [isMobile, isVisible, setShowButton, showButton]);

  return showButton;
}
