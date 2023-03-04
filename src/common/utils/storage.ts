import { useState } from 'react';

export enum StorageType {
  LOCAL_STORAGE = 'localStorage',
  SESSION_STORAGE = 'sessionStorage',
}

// a single place to define all used localStorage keys, to avoid collisions or hardcoded strings
export enum StorageKeys {
  COUNTY_MAP_TYPE = 'COUNTY_MAP_TYPE',
}

const storageMemo: { [index: string]: boolean } = {};

// From https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability
export function storageAvailable(storageType: StorageType) {
  if (!(storageType in storageMemo)) {
    let storage;
    const testKey = '__storage_test__';
    try {
      // @ts-ignore
      storage = window[storageType];
      storage.setItem(testKey, testKey);
      storage.removeItem(testKey);
      storageMemo[storageType] = true;
    } catch (e) {
      storageMemo[storageType] = false;
    }
  }
  return storageMemo[storageType];
}

/*!
   License: https://github.com/uidotdev/usehooks/blob/master/LICENSE
   Hook from https://usehooks.com/useLocalStorage/
   but updated to fallback to setState if localstorage is not available.
  */
export function useLocalStorage<T>(
  key: StorageKeys,
  initialValue?: T,
): [T, (value: T) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    let item;
    try {
      if (storageAvailable(StorageType.LOCAL_STORAGE)) {
        item = window.localStorage.getItem(key);
        item = item ? JSON.parse(item) : initialValue;
      } else {
        item = initialValue;
      }
    } catch (error) {
      item = initialValue;
    }
    return item;
  });
  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue = (value: T) => {
    // Allow value to be a function so we have same API as useState
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    try {
      window.localStorage.setItem(key as string, JSON.stringify(valueToStore));
    } finally {
      // A more advanced implementation would handle the error case
      setStoredValue(valueToStore);
    }
  };
  if (storageAvailable(StorageType.LOCAL_STORAGE)) {
    return [storedValue, setValue];
  } else {
    return [storedValue, setStoredValue];
  }
}
