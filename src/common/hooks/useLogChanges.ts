import { useEffect, useRef } from 'react';

/**
 * Diagnostic hook to detect if any entries in the passed object have changed
 * since the last call. This can be helpful to figure out why components are
 * re-rendering, hooks are re-running, etc.
 * Adapted from https://stackoverflow.com/a/51082563
 *
 * Example usage:
 *
 * const MyComponent = React.memo(props => {
 *   useLogChanges(props);
 *   ...
 *   useLogChanges(hookDep);
 *   useEffect(() => { ... }, [hookDep])
 *   ...
 * });
 *
 */
export default function useLogChanges(props: { [key: string]: unknown }) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {} as { [key: string]: unknown });
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
}
