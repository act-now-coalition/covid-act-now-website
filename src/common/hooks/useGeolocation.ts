/*
  Captures the user's location using IP-API (https://ip-api.com/)
  Returns either undefined or an object with user's zipCode and stateCode
*/

import { useEffect, useState } from 'react';

// move this elsewhere
export interface GeolocationInfo {
  zipCode: string;
  stateCode: string;
}

export default function useGeolocation(): GeolocationInfo | undefined {
  const [ipData, setIpData] = useState<GeolocationInfo | undefined>();

  useEffect(() => {
    const fetchIpData = () => {
      fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data =>
          setIpData({
            zipCode: data.postal,
            stateCode: data.region_code,
          }),
        );
    };
    fetchIpData();
  }, []);

  return ipData;
}
