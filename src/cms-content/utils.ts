import { deburr, words } from 'lodash';

export function sanitizeID(sectionId: string): string {
  return deburr(words(sectionId).join('-')).toLowerCase();
}

export type Markdown = string;

export interface TocItem {
  to: string;
  label: string;
  items?: TocItem[];
}
