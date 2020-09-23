/**
 * Utils for organizing and working with our netlify-cms-based content
 */

import aboutPageContent from 'cms-content/about/about-page.json';

export enum PageType {
  ABOUT,
}

const pageTypeToFileMap = {
  [PageType.ABOUT]: aboutPageContent,
};

// Retrives page-specific json file:
export function getPageContent(
  pageType: PageType,
): { [fieldName: string]: any } {
  return pageTypeToFileMap[pageType];
}
