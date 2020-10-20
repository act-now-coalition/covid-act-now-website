/**
 * Utils for organizing and working with our netlify-cms-based content
 */

// TODO in diff branch (Chelsi): transition Donate + About to
// export content directly from their index.ts files
import aboutPageContent from 'cms-content/about/about-page.json';
import donateContent, { DonatePageContent } from 'cms-content/donate';
import dataDisclaimers from 'cms-content/data-disclaimers';
import { Disclaimer } from 'cms-content/data-disclaimers';

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

// TODO (Chelsi): clean up if keeping?
export function getDataDisclaimers(
  fips: string,
  stateCode: string,
  countyId?: string,
): Disclaimer[] {
  const disclaimersContent = dataDisclaimers.disclaimers;
  if (countyId) {
    return disclaimersContent.filter(
      disclaimer =>
        disclaimer.stateCodes?.split(',').includes(stateCode) ||
        disclaimer.fipsCodes?.split(',').includes(fips),
    );
  }
  return disclaimersContent.filter(disclaimer =>
    disclaimer.fipsCodes?.split(',').includes(fips),
  );
}
