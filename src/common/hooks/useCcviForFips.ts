import { useEffect, useState } from 'react';
import useFipsToCcviMap from './useFipsToCcviMap';
import { RegionCcviItem } from 'common/data';

export default function useCcviForFips(fips: any): null | RegionCcviItem {
  const [fipsCcviScores, setFipsCcviScores] = useState<null | RegionCcviItem>(
    null,
  );

  const { result } = useFipsToCcviMap();

  useEffect(() => {
    if (result && result[fips]) {
      setFipsCcviScores(result[fips]);
    }
  }, [fips, result]);

  return fipsCcviScores;
}
