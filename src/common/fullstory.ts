import * as FullStory from '@fullstory/browser';

/**
 * We want to sample FullStory recordings so we don't hit the limit so quickly. We do this
 * by storing a flag in localStorage and only initializing FullStory for the percentage of
 * users that have the flag set to "true".
 *
 * If the flag is not found in localStorage, we generate a random number between 0 and 1,
 * and set the flag to true if the number is below the sampling percentage.
 */

const FULLSTORY_RECORD_KEY = 'FULLSTORY_RECORD';

// Percentage of overall users that we want to record
const FULLSTORY_RECORD_PERCENT = 1 / 100;

enum RecordSession {
  TRUE = 'true',
  FALSE = 'false',
}

export function initFullStory() {
  if (!storageAvailable('localStorage')) {
    return;
  }

  initStorage();

  // If we can't find the value in localStorage we won't enable recordings in FullStory
  if (localStorage.getItem(FULLSTORY_RECORD_KEY) === RecordSession.TRUE) {
    FullStory.init({ orgId: 'XEVN9' });
  }
}

function initStorage() {
  if (localStorage.getItem(FULLSTORY_RECORD_KEY)) {
    return;
  }
  const enableRecording = Math.random() < FULLSTORY_RECORD_PERCENT;
  try {
    localStorage.setItem(
      FULLSTORY_RECORD_KEY,
      enableRecording ? RecordSession.TRUE : RecordSession.FALSE,
    );
  } catch (err) {
    // It doesn't matter if we can't write to localStorage, we only need this
    // for 1% of the users.
    console.warn(`Error writing to localStorage`, err);
  }
}

// From https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability
function storageAvailable(storageType: string) {
  let storage;
  const x = '__storage_test__';
  try {
    // @ts-ignore
    storage = window[storageType];
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
