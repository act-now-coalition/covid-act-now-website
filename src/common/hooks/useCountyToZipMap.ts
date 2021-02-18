import { useEffect, useState } from 'react';
import { singletonHook } from 'react-singleton-hook';

const ZIPCODE_JSON_URL = '/data/county-zipcode.json';

export interface CountyToZipMap {
  [fips: string]: string[];
}

export interface UseCountyToZipMapReturn {
  countyToZipMap: CountyToZipMap | undefined;
  isLoading: boolean;
}

const init = {
  countyToZipMap: undefined,
  // initialize to true so client's don't have to handle case
  // when not yet loading and not defined, since we kick off the load immediately
  isLoading: true,
};

const useCountyToZipMapImpl = (): UseCountyToZipMapReturn => {
  const [zipData, setZipData] = useState<CountyToZipMap | undefined>(
    init.countyToZipMap,
  );
  const [isLoading, setIsLoading] = useState<boolean>(init.isLoading);

  useEffect(() => {
    const fetchZipData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(ZIPCODE_JSON_URL);
        const data = await response.json();
        setZipData(data);
      } catch (e) {
        setZipData({});
      } finally {
        setIsLoading(false);
      }
    };
    fetchZipData();
  }, [setZipData, setIsLoading]);

  return {
    countyToZipMap: zipData,
    isLoading,
  };
};

const useCountyToZipMap = singletonHook(init, useCountyToZipMapImpl);
export default useCountyToZipMap;
