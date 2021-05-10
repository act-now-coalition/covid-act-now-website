export enum ExpandableSection {
  VULNERABILITIES,
  RECOMMENDATIONS,
}

interface sectionDetails {
  collapsedHeight: number;
  tabTextCollapsed: string;
  tabTextExpanded: string;
  trackingLabel: string;
}

export const sectionDetails: { [key in ExpandableSection]: sectionDetails } = {
  [ExpandableSection.VULNERABILITIES]: {
    collapsedHeight: 240,
    tabTextExpanded: 'Less',
    tabTextCollapsed: 'More',
    trackingLabel: 'Vulnerabilities',
  },
  [ExpandableSection.RECOMMENDATIONS]: {
    collapsedHeight: 240,
    tabTextExpanded: 'Less',
    tabTextCollapsed: 'More',
    trackingLabel: 'Recommendations',
  },
};
