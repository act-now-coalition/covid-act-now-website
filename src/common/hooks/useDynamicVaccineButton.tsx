/**
 * Dictates whether or not the 'Find a vaccine' button renders
 * on a location page (VaccineButton.tsx)
 *
 * Always renders on non-mobile screens (600+ px)
 *
 * On mobile screens, does not render after the page has been scrolled 800px
 */

import { useEffect, useState } from 'react';
import useShowPastPosition from './useShowPastPosition';
import useBreakpoint from './useBreakpoint';

export default function useDynamicVaccineButton(): boolean {
  const [showButton, setShowButton] = useState(false);
  const isMobile = useBreakpoint(600);
  const hasScrolled = useShowPastPosition(800);
  const showOnMobile = isMobile && !hasScrolled;

  useEffect(() => {
    if (!isMobile || showOnMobile) {
      setShowButton(true);
    } else setShowButton(false);
  }, [isMobile, hasScrolled, showOnMobile]);

  return showButton;
}
