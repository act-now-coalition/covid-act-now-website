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

const init = { countyToZipMap: undefined, isLoading: true };

const useCountyToZipMapImpl = (): UseCountyToZipMapReturn => {
  const [zipData, setZipData] = useState<CountyToZipMap | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchZipData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(ZIPCODE_JSON_URL);
        const data = await response.json();
        setZipData(data);
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
