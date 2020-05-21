import { useEffect } from 'react';

export default function useOutsideClickHandler(ref, setStateFunc) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setStateFunc(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, setStateFunc]);
}
