export const mobileBreakpoint = '800px';

export const materialSMBreakpoint = '600px';

// iPhone 5 screen is 320px wide. This breakpoint is used for iphone5 specific adjustments:
export const smallPhoneBreakpoint = '321px';

// Breakpoint at which the county map changes to position:fixed on the location page:
export const countyMapToFixedBreakpoint = '1320px';

interface LocationPageSpacing {
  mapWidthDesktop: string;
  maxWidthContent: string;
}

export interface Spacing {
  contentGutterMobile: string;
  contentGutterDesktop: string;
  locationPage: LocationPageSpacing;
}

// TODO (chelsi) - use these content gutters throughout site
export const spacingTheme: Spacing = {
  contentGutterMobile: '1.25rem 1rem',
  contentGutterDesktop: '2rem',
  locationPage: {
    mapWidthDesktop: '320px',
    maxWidthContent: '900px',
  },
};
