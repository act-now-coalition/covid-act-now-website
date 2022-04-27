/**
 * On mobile screens, we default the Trends view to show past-180-days
 */

import { useEffect, useState } from 'react';
import useBreakpoint from './useBreakpoint';
import { Period } from 'components/Explore/utils';

export default function useDefaultTrendsPeriod(): Period {
  const isMobile = useBreakpoint(800);
  const [defaultTimePeriod, setDefaultTimePeriod] = useState<Period>(
    Period.ALL,
  );

  useEffect(() => {
    if (isMobile) {
      setDefaultTimePeriod(Period.DAYS_180);
    } else {
      setDefaultTimePeriod(Period.ALL);
    }
  }, [isMobile]);
  return defaultTimePeriod;
}
