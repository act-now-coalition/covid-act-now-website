/*
  Captures the user's location using IP-API (https://ip-api.com/)
  Returns either undefined or an object with user's zipCode and stateCode
*/

import { useEffect, useState } from 'react';

interface Geolocation {
  zipCode: string;
  stateCode: string;
}

export default function useGeolocation(): Geolocation | undefined {
  const [ipData, setIpData] = useState<Geolocation | undefined>();

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
