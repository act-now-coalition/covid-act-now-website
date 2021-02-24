import { useEffect, useState } from 'react';

/** Represents the current state of an asynchronous Promise. */
export interface PromiseState<T> {
  /** The result if the promise is resolved, else null. */
  result?: T;

  /** True if the promise is still pending, false if it is resolved or rejected. */
  pending: boolean;

  /** The error if the promise was rejected. */
  error?: Error;
}

/**
 * Helper to wrap an asynchronous promise result into a React Hook. The current state
 * of the Promise will be returned each time the hook is called as a `PromiseState`.
 *
 * @param promise The promise to wrap. Must not change between calls or the hook will re-run.
 * @returns The current state of the promise.
 */
export default function usePromise<T>(promise: Promise<T>): PromiseState<T> {
  const [result, setResult] = useState<PromiseState<T>>({ pending: true });
  useEffect(() => {
    let canceled = false;
    promise
      .then(r => {
        if (!canceled) {
          setResult({ pending: false, result: r });
        }
      })
      .catch(err => {
        setResult({ pending: false, error: err });
      });

    return () => {
      canceled = true;
    };
  }, [promise]);

  return result;
}
