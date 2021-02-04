import ReactGA from 'react-ga';

export interface Tracker {
  trackingId: string;
  name: string;
}

/**
 * In the early days of CAN, we used what we now call the "legacy" tracker, but
 * it wasn't configured correctly, so we created a new 'property', which uses
 * the same GA account, but collects hits separately (having two trackers won't
 * duplicate events or page views).
 *
 * We are keeping the two trackers to be able to view high-level metrics since
 * the beginning if we need to, but for day-to-day usage, we should look at
 * the default tracker.
 */
export const defaultTracker: Tracker = {
  trackingId: 'UA-160622988-1',
  name: 'default',
};

export const legacyTracker: Tracker = {
  trackingId: 'G-HFCDC7K5G1',
  name: 'legacy',
};

/**
 * Categories represent high-level groups of events in the application.
 */
export enum EventCategory {
  ARTICLES = 'articles',
  COMPARE = 'compare',
  EXPLORE = 'explore',
  ENGAGEMENT = 'engagement',
  VOTE_2020 = 'vote',
  DONATE = 'donate',
  MAP = 'map',
  RECOMMENDATIONS = 'recommendations',
  INDIGENOUS_PEOPLES_DAY = 'indigenous peoples day',
  GLOSSARY = 'glossary',
  FAQ = 'faq',
  METRIC_EXPLAINERS = 'metric explainers',
  EXPOSURE_NOTIFICATIONS = 'exposure notifications',
  SEARCH = 'search',
  VACCINATION = 'vaccination',
  WEB_VITALS = 'web vitals',
  NONE = 'none', // use NONE for development
  GEOLOCATION_CARDS = 'geolocation cards',
}

/**
 * Actions represent something that the user does and that we want to track
 * and count.
 */
export enum EventAction {
  SHARE = 'share',
  SAVE_IMAGE = 'save image',
  COPY_LINK = 'copy link',
  CLICK_LINK = 'click link',
  CLICK = 'click',
  SELECT = 'select',
  OPEN_MODAL = 'open modal',
  SUBSCRIBE = 'subscribe',
  ALERTS_UNSUBSCRIBE = 'alertsUnsubscribe',
  EXPAND = 'expand',
  REDIRECT = 'redirect',
  FOCUS = 'focus',
  NAVIGATE = 'navigate',
  CLS = 'Cumulative Layout Shift (*1000)',
  FCP = 'First Contentful Paint (ms)',
  FID = 'First Input Delay (ms)',
  LCP = 'Largest Contentful Paint (ms)',
  TTFB = 'Time to First Byte (ms)',
}

/**
 * An event represents a single user interaction. We must trigger a single
 * event per interaction to avoid double counting.
 */
export function trackEvent(
  category: EventCategory,
  action: EventAction,
  label?: string,
  value?: number,
  nonInteraction?: boolean,
  transport: 'beacon' | 'xhr' | 'image' = 'beacon',
) {
  if (category !== EventCategory.NONE) {
    ReactGA.event({
      category,
      action,
      label,
      value,
      nonInteraction,
      transport,
    });
  }
}

export function trackSaveImage(category: EventCategory, label: string) {
  trackEvent(category, EventAction.SAVE_IMAGE, label);
}

export function trackCopyLink(category: EventCategory, label: string) {
  trackEvent(category, EventAction.COPY_LINK, label);
}

/**
 * TODO (Pablo): In my opinion, this way of tracking is not granular enough,
 * since it doesn't tell us anything about what was shared (only where,
 * Facebook, Twitter, etc).
 */
export function trackShare(label: string) {
  trackEvent(EventCategory.ENGAGEMENT, EventAction.SHARE, label);
}

/**
 * All 2020 election related link clicks
 */
export function trackVoteClick(label: string) {
  trackEvent(EventCategory.VOTE_2020, EventAction.CLICK_LINK, label);
}

/**
 * Callback passed to web-vitals to report important performance events
 */
export function trackWebVitals({
  name,
  delta,
  id,
}: {
  name: 'CLS' | 'FID' | 'LCP' | 'FCP' | 'TTFB';
  delta: number;
  id: string;
}) {
  trackEvent(
    EventCategory.WEB_VITALS,
    EventAction[name],
    // The `id` value will be unique to the current page load. When sending
    // multiple values from the same page (e.g. for CLS), Google Analytics can
    // compute a total by grouping on this ID (note: requires `eventLabel` to
    // be a dimension in your report).
    id,
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is first multiplied by 1000 for greater precision
    // (note: increase the multiplier for greater precision if needed).
    Math.round(name === 'CLS' ? delta * 1000 : delta),
    // Use a non-interaction event to avoid affecting bounce rate.
    true,
    // Use `sendBeacon()` if the browser supports it.
    'beacon',
  );
}
