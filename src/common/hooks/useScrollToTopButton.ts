/* A hook used to control the ScrollToTopButton (ScrollToTopButton.tsx) */

import { useEffect } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useScrollPosition from '@react-hook/window-scroll';

export default function useScrollToTopButton(
  showButton: boolean,
  setShowButton: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(800));
  const scrollY = useScrollPosition();

  useEffect(() => {
    if (isMobile && scrollY > 700) {
      setShowButton(true);
    } else setShowButton(false);
  }, [isMobile, scrollY, setShowButton, showButton]);

  return showButton;
}
