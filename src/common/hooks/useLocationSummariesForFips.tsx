import { useEffect, useState } from 'react';
import { LocationSummary, useSummaries } from 'common/location_summaries';

export default function useLocationSummariesForFips(fips: string) {
  const [locationSummaryForFips, setLocationSummaryForFips] = useState<
    LocationSummary
  >();
  const summaries = useSummaries();

  useEffect(() => {
    if (summaries) {
      setLocationSummaryForFips(summaries[fips]);
    }
  }, [summaries, fips]);
  return locationSummaryForFips;
}
