import { EventCategory } from './utils';

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (action: string, category: EventCategory) => {
  gtag('event', action, {
    event_category: category,
  });
};
