import deburr from 'lodash/deburr';
import words from 'lodash/words';
import trim from 'lodash/trim';

export function sanitizeID(sectionId: string): string {
  return trim(deburr(words(sectionId).join('-')).toLowerCase());
}

export type Markdown = string;

export interface TocItem {
  to: string;
  label: string;
  items?: TocItem[];
}
