/**
 * We want to sample FullStory recordings so we don't hit the limit so quickly. We do this
 * by storing a flag in localStorage and only initializing FullStory for the percentage of
 * users that have the flag set to "true".
 *
 * If the flag is not found in localStorage, we generate a random number between 0 and 1,
 * and set the flag to true if the number is below the sampling percentage.
 */

// Percentage of overall users that we want to record
const FULLSTORY_RECORD_PERCENT = 1 / 100;

const FULLSTORY_RECORD_KEY = 'FULLSTORY_RECORD';

enum RecordSession {
  TRUE = 'true',
  FALSE = 'false',
}

export function isRecordingEnabled(recordKey: string, recordPercent: number) {
  if (!storageAvailable('localStorage')) {
    return false;
  }
  initStorage(recordKey, recordPercent);
  return localStorage.getItem(recordKey) === RecordSession.TRUE;
}

async function getFullStory() {
  if (isRecordingEnabled(FULLSTORY_RECORD_KEY, FULLSTORY_RECORD_PERCENT)) {
    return import('@fullstory/browser');
  } else {
    return null;
  }
}

export async function initFullStory(): Promise<void> {
  const FS = await getFullStory();
  if (FS) {
    FS.init({ orgId: 'XEVN9' });
  }
}

export async function fullStoryTrackEvent(
  eventName: string,
  properties: any,
): Promise<void> {
  const FS = await getFullStory();
  if (FS) {
    FS.event(eventName, properties);
  }
}

function initStorage(recordKey: string, recordPercent: number) {
  if (localStorage.getItem(recordKey)) {
    return;
  }
  const enableRecording = Math.random() < recordPercent;
  try {
    localStorage.setItem(
      recordKey,
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
