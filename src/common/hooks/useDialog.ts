import { useState } from 'react';

export default function useDialog(
  initialIsOpen: boolean,
): [boolean, () => void, () => void] {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  return [isOpen, openDialog, closeDialog];
}
