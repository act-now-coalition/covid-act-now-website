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
  RECOMMENDATIONS = 'recommendations',
  INDIGENOUS_PEOPLES_DAY = 'indigenous peoples day',
  GLOSSARY = 'glossary',
  FAQ = 'faq',
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
) {
  ReactGA.event({ category, action, label, value, nonInteraction });
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
