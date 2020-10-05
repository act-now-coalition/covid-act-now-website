/**
 * Utils for organizing and working with our netlify-cms-based content
 */

import aboutPageContent from 'cms-content/about/about-page.json';
import donateContent, { DonatePageContent } from 'cms-content/donate';

export enum PageType {
  ABOUT,
  DONATE,
}

const pageTypeToFileMap = {
  [PageType.ABOUT]: aboutPageContent,
  [PageType.DONATE]: donateContent,
};

// Retrives page-specific json file:
export function getPageContent(
  pageType: PageType,
): { [fieldName: string]: any } {
  return pageTypeToFileMap[pageType];
}

export type { DonatePageContent };
export { donateContent };
