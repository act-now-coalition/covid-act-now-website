import { useEffect, useState } from 'react';
import { useBreakpoint } from 'common/hooks';

export default function useChartHeightForBreakpoint(): number {
  const chartHeightDesktop = 375;
  const chartHeightMobile = 250;
  const [chartHeight, setChartHeight] = useState<number>(chartHeightDesktop);
  const isMobile = useBreakpoint(600);

  useEffect(() => {
    if (isMobile) {
      setChartHeight(chartHeightMobile);
    } else {
      setChartHeight(chartHeightDesktop);
    }
  }, [isMobile]);

  return chartHeight;
}
