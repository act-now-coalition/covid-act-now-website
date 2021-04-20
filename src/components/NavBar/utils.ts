import { EventCategory, EventAction, trackEvent } from 'components/Analytics';

export function trackNavigation(label: string, isMobile?: boolean) {
  trackEvent(
    EventCategory.TOP_NAVBAR,
    EventAction.NAVIGATE,
    label,
    isMobile ? 1 : 0,
  );
}

export function trackMobileMenuOpen() {
  trackEvent(
    EventCategory.TOP_NAVBAR,
    EventAction.CLICK,
    'Hamburger Menu: Open',
  );
}
