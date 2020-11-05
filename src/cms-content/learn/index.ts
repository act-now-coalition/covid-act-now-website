import { chain, keyBy, reject } from 'lodash';
import faq from './learn-faq.json';
import glossary from './learn-glossary.json';
import landing from './learn-landing.json';
import caseStudies from './learn-case-studies.json';
import { sanitizeID } from './utils';

type Markdown = string;

/*
  For FAQ:
*/
export interface Question {
  question: string;
  answer: Markdown;
}

export interface FaqSection {
  sectionTitle: string;
  sectionId: string;
  questions: Question[];
}

export interface FaqContent {
  header: string;
  intro: Markdown;
  sections: FaqSection[];
  metadataTitle: string;
  metadataDescription: string;
}

function sanitizeSection(section: FaqSection): FaqSection {
  const { sectionId, ...other } = section;
  return {
    sectionId: sanitizeID(sectionId),
    ...other,
  };
}

function sanitizeFaq(faq: FaqContent) {
  const { sections, ...other } = faq;
  return {
    sections: sections.map(sanitizeSection),
    ...other,
  };
}

export const faqContent = sanitizeFaq(faq) as FaqContent;

/*
  For Glossary:
*/

export interface Term {
  term: string;
  termId: string;
  definition: Markdown;
}

export interface GlossaryContent {
  header: string;
  intro: Markdown;
  terms: Term[];
  metadataTitle: string;
  metadataDescription: string;
}

// (Chelsi): make these sanitize functions reusable between learn pages?
function sanitizeTerm(term: Term): Term {
  const { termId, ...other } = term;
  return {
    termId: sanitizeID(termId),
    ...other,
  };
}

function sanitizeGlossary(glossary: GlossaryContent) {
  const { terms, ...other } = glossary;
  return {
    terms: terms.map(sanitizeTerm),
    ...other,
  };
}

export const glossaryContent = sanitizeGlossary(glossary) as GlossaryContent;

/*
  For Landing page:
*/

export interface LandingSection {
  sectionTitle: string;
  sectionId: string;
  description: Markdown;
  buttonCta: string;
  buttonRedirect: string;
}

export interface LandingContent {
  header: string;
  intro: Markdown;
  sections: LandingSection[];
  metadataTitle: string;
  metadataDescription: string;
}

export const landingPageContent = landing as LandingContent;

/**
 * Case Studies
 */
export interface CaseStudy {
  header: string;
  shortTitle: string;
  author: Markdown;
  caseStudyId: string;
  logoUrl: string;
  logoAltText: string;
  summary: Markdown;
  body: Markdown;
  tags: string[];
}

export interface CaseStudyCategory {
  header: string;
  categoryId: string;
  caseStudies?: CaseStudy[];
}

export interface CaseStudiesContent {
  header: string;
  intro: Markdown;
  categories: CaseStudyCategory[];
}

const allCaseStudies = chain(caseStudies.categories)
  .map(category => category.caseStudies)
  .flatten()
  .value();

// Case studies indexed by caseStudyId for easier access on the
// individual case study route.
export const caseStudiesById = keyBy(allCaseStudies, 'caseStudyId');

export function getCaseStudyCategory(
  caseStudyId: string,
): CaseStudyCategory | undefined {
  const isTargetCaseStudy = (study: CaseStudy) =>
    study.caseStudyId === caseStudyId;

  return caseStudies.categories.find(category =>
    category.caseStudies.find(isTargetCaseStudy),
  );
}

export function getMoreStudies(caseStudyId: string): CaseStudy[] {
  const category = getCaseStudyCategory(caseStudyId);
  const isTargetCaseStudy = (study: CaseStudy) =>
    study.caseStudyId === caseStudyId;

  if (!category) {
    return [];
  } else {
    const otherStudies = reject(category.caseStudies, isTargetCaseStudy);
    return otherStudies.length > 0 ? otherStudies : [];
  }
}

export const caseStudiesContent = caseStudies as CaseStudiesContent;

interface TocItem {
  label: string;
  to: string;
  items?: TocItem[];
}

// TODO (pablo): Should we have a short heading for categories?
export const learnPages: TocItem[] = [
  { label: 'Glossary', to: '/glossary' },
  {
    label: 'FAQ',
    to: '/faq',
    items: faqContent.sections.map(section => ({
      to: `/faq#${section.sectionId}`,
      label: section.sectionTitle,
    })),
  },
  {
    label: 'Case studies',
    to: '/case-studies',
    items: caseStudiesContent.categories.map(category => ({
      to: `/case-studies#${category.categoryId}`,
      label: category.header.replace('Learn from ', ''),
    })),
  },
];
