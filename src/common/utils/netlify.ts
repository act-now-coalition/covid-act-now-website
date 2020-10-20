/**
 * Utils for organizing and working with our netlify-cms-based content
 */

// TODO in diff branch (Chelsi): transition Donate + About to
// export content directly from their index.ts files
import aboutPageContent from 'cms-content/about/about-page.json';
import donateContent, { DonatePageContent } from 'cms-content/donate';
import {
  stateWideDisclaimers,
  pageSpecificDisclaimers,
  Disclaimer,
} from 'cms-content/data-disclaimers';

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

export function getDataDisclaimers(
  fips: string,
  stateCode: string,
  countyId?: string,
): Disclaimer[] {
  const stateWideDisclaimersContent = stateWideDisclaimers.disclaimers;
  const pageSpecificDisclaimersContent = pageSpecificDisclaimers.disclaimers;
  if (countyId) {
    const stateWide = stateWideDisclaimersContent.filter(disclaimer =>
      disclaimer.stateCodes.split(',').includes(stateCode),
    );
    const pageSpecific = pageSpecificDisclaimersContent.filter(disclaimer =>
      disclaimer.fipsCodes.split(',').includes(fips),
    );
    return [...stateWide, ...pageSpecific];
  }
  return pageSpecificDisclaimersContent.filter(disclaimer =>
    disclaimer.fipsCodes.split(',').includes(fips),
  );
}
