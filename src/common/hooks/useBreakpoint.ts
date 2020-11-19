/* Determines if the screen width is less than a specified width */

import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export default function useBreakpoint(breakpointWidth: number): boolean {
  const theme = useTheme();
  const isBelowBreakpoint = useMediaQuery(
    theme.breakpoints.down(breakpointWidth),
  );
  return isBelowBreakpoint;
}
