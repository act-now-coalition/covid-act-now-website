import { useBreakpoint } from 'common/hooks';

export default function useChartHeightForBreakpoint(): number {
  const chartHeightDesktop = 375;
  const chartHeightMobile = 250;
  const isMobile = useBreakpoint(600);
  return isMobile ? chartHeightMobile : chartHeightDesktop;
}
