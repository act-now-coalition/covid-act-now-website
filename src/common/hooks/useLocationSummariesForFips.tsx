import { useSummaries } from 'common/location_summaries';

export default function useLocationSummariesForFips(fips: string) {
  const summaries = useSummaries();
  return summaries?.[fips] || null;
}
