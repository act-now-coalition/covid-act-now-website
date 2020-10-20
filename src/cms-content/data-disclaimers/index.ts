import stateWide from './state-wide-disclaimers.json';
import pageSpecific from './page-specific-disclaimers.json';

type Markdown = string;

export interface StateWideDisclaimer {
  disclaimerCopy: Markdown;
  stateCodes: string;
}

export interface PageSpecificDisclaimer {
  disclaimerCopy: Markdown;
  fipsCodes: string;
}

export interface PageSpecificDisclaimerContent {
  disclaimers: PageSpecificDisclaimer[];
}

export interface StateWideDisclaimerContent {
  disclaimers: StateWideDisclaimer[];
}

// used to type return arr of getDataDisclaimers
export interface Disclaimer {
  disclaimerCopy: Markdown;
  fipsCodes?: string;
  stateCodes?: string;
}

export const stateWideDisclaimers = stateWide as StateWideDisclaimerContent;
export const pageSpecificDisclaimers = pageSpecific as PageSpecificDisclaimerContent;
