/**
 * Utility functions to track user interactions. Categories, actions and labels
 * are critical to generate meaningful reports in Google Analytics.
 *
 * Read more: https://support.google.com/analytics/answer/1033068
 */

/**
 * Categories represent high-level groups of events in the application.
 */
export enum EventCategory {
  COMPARE = 'compare',
  EXPLORE = 'explore',
  ENGAGEMENT = 'engagement',
}

/**
 * Actions represent something that the user does and that we want to track
 * and count.
 *
 * Ideally, it should not depend of the category to allow grouping
 * across categories. For example, we might want to know the number of
 * `save image` events across all the categories, and then drill-down by
 * category.
 */
export enum EventAction {
  SHARE = 'share',
  SAVE_IMAGE = 'save image',
  COPY_LINK = 'copy link',
}

/**
 * An event represents a single user interaction. We must trigger a single
 * event per interaction to avoid double counting.
 */
export default function trackEvent(
  category: EventCategory,
  action: EventAction,
  label: string,
  value?: number,
) {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
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
