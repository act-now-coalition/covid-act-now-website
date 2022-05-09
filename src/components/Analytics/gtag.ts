// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const trackGA4Event = (
  action: string,
  category: string,
  label: string,
  value?: number,
) => {
  if (gtag) {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      event_value: value,
    });
  }
};
