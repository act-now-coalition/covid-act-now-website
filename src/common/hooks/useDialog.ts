import { useState } from 'react';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

export default function useDialog(
  initialIsOpen: boolean,
  trackingCategory: EventCategory,
  trackingLabel: string,
): [boolean, () => void, () => void] {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const openDialog = () => {
    setIsOpen(true);
    trackEvent(trackingCategory, EventAction.OPEN_MODAL, trackingLabel);
  };
  const closeDialog = () => setIsOpen(false);
  return [isOpen, openDialog, closeDialog];
}
