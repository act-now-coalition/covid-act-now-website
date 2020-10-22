import { deburr, words } from 'lodash';

export function sanitizeID(sectionId: string): string {
  return deburr(words(sectionId).join('-')).toLowerCase();
}
