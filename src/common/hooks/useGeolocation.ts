/*
  Captures the user's location using IP-API (https://ip-api.com/)
  Returns either undefined or an object with user's zipCode, stateCode, and country

  Note: geolocation does not work locally. To test locally, replace
  fetchGeolocationData() with mockGeolocationData() in the effect.
*/

import { singletonHook } from 'react-singleton-hook';

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

// Removing the external call to ip-api, and replacing it with a mock function
const useGeolocation = singletonHook(
  { geolocationData: undefined, isLoading: false },
  (): UseGeolocationReturn => {
    return {
      geolocationData: undefined,
      isLoading: false,
    };
  },
);

export default useGeolocation;
