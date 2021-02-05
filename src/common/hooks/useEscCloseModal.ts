/* Closes modal when hitting escape key */

import { useEffect } from 'react';

export default function useEscCloseModal(handleCloseModal: any): void {
  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.keyCode === 27) {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleCloseModal]);
}
