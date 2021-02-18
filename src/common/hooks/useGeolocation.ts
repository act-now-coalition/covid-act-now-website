/*
  Captures the user's location using IP-API (https://ip-api.com/)
  Returns either undefined or an object with user's zipCode, stateCode, and country

  Note: geolocation does not work locally. To test locally, replace
  fetchGeolocationData() with mockGeolocationData() in the effect.
*/

import { useEffect, useState } from 'react';
import { IP_API_KEY } from 'common/ip-api';

// move this elsewhere
export interface GeolocationInfo {
  zipCode: string;
  stateCode: string;
  country: string;
}

export interface UseGeolocationReturn {
  geolocationData: GeolocationInfo | undefined;
  isLoading: boolean;
}

export default function useGeolocation(): UseGeolocationReturn {
  const [ipData, setIpData] = useState<GeolocationInfo | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIpData = () => {
      setIsLoading(true);
      fetchGeolocationData()
        .then(data =>
          setIpData({
            zipCode: data.zip,
            stateCode: data.region,
            country: data.country,
          }),
        )
        .catch(e => console.error(e))
        .finally(() => setIsLoading(false));
    };
    fetchIpData();
  }, [setIpData, setIsLoading]);

  const geolocationReturnObj: UseGeolocationReturn = {
    geolocationData: ipData,
    isLoading,
  };

  return geolocationReturnObj;
}

function fetchGeolocationData() {
  return fetch(
    `https://pro.ip-api.com/json/?key=${IP_API_KEY}`,
  ).then(response => response.json());
}

// Use this mock to simulate fetchGeolocationData, other data can be obtained from
// https://ip-api.com/#<IP_ADDRESS> (https://ip-api.com/#8.8.8.8)

// function mockGeolocationData() {
//   return Promise.resolve({
//     query: '8.8.8.8',
//     status: 'success',
//     continent: 'North America',
//     continentCode: 'NA',
//     country: 'United States',
//     countryCode: 'US',
//     region: 'VA',
//     regionName: 'Virginia',
//     city: 'Ashburn',
//     district: '',
//     zip: '20149',
//     lat: 39.03,
//     lon: -77.5,
//     timezone: 'America/New_York',
//     offset: -18000,
//     currency: 'USD',
//     isp: 'Google LLC',
//     org: 'Google Public DNS',
//     as: 'AS15169 Google LLC',
//     asname: 'GOOGLE',
//     mobile: false,
//     proxy: false,
//     hosting: true,
//   });
// }
