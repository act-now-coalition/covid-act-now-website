import glossary from './learn-glossary.json';
import { sanitizeID, Markdown } from '../utils';

/*
  Glossary:
*/

export interface Term {
  term: string;
  termId: string;
  definition: Markdown;
  category: string;
}

export interface GlossaryContent {
  header: string;
  intro: Markdown;
  lastUpdatedDate: string;
  terms: Term[];
  metadataTitle: string;
  metadataDescription: string;
}

// (Chelsi): make these sanitize functions reusable between learn pages?
const sanitizeTerm = (term: Term): Term => ({
  ...term,
  termId: sanitizeID(term.termId),
});

const sanitizeGlossary = (glossary: GlossaryContent): GlossaryContent => ({
  ...glossary,
  terms: glossary.terms.map(sanitizeTerm),
});

export const glossaryContent = sanitizeGlossary(glossary) as GlossaryContent;
