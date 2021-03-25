import { deburr, words, trim } from 'lodash';

export function sanitizeID(sectionId: string): string {
  return trim(deburr(words(sectionId).join('-')).toLowerCase());
}

export type Markdown = string;

export interface TocItem {
  to: string;
  label: string;
  items?: TocItem[];
}
