import { useState } from 'react';

// a single place to define all used localStorage keys, to avoid collisions or hardcoded strings
export enum StorageKeys {
  COUNTY_MAP_TYPE = 'COUNTY_MAP_TYPE',
  FULLSTORY_RECORD = 'FULLSTORY_RECORD',
}

// From https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability
export function storageAvailable(storageType: string) {
  let storage;
  const testKey = '__storage_test__';
  try {
    // @ts-ignore
    storage = window[storageType];
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

// Hook from https://usehooks.com/useLocalStorage/
// but updated to fallback to setState if localstorage is not available.
export function useLocalStorage<T>(
  key: StorageKeys,
  initialValue: T,
): [T, (value: T) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      let item;
      if (storageAvailable('localStorage')) {
        item = window.localStorage.getItem(key);
      }
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : (initialValue as T);
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue as T;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key as string, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  if (storageAvailable('localStorage')) {
    return [storedValue as T, setValue];
  } else {
    return [storedValue as T, setStoredValue];
  }
}
