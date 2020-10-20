import content from './disclaimers.json';

type Markdown = string;

export interface Disclaimer {
  disclaimerCopy: Markdown;
  stateCodes?: string;
  fipsCodes?: string;
}

export interface DisclaimerContent {
  disclaimers: Disclaimer[];
}

const dataDisclaimers = content as DisclaimerContent;
export default dataDisclaimers;
