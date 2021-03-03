/* Closes modals + share buttons module when hitting escape key */

import { useEffect } from 'react';

export default function useEscToClose(
  handleClose: () => void,
  additionalDependency: any = null,
): void {
  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.keyCode === 27) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleClose, additionalDependency]);
}
