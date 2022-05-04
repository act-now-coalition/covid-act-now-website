import { EventCategory } from './utils';

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (
  action: string,
  category: EventCategory,
  label?: string,
  value?: number,
) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    event_value: value,
  });
};
