import { chain, keyBy, reject, map, uniq, replace } from 'lodash';
import faq from './learn-faq.json';
import glossary from './learn-glossary.json';
import landing from './learn-landing.json';
import caseStudies from './learn-case-studies.json';
import { sanitizeID, Markdown, TocItem } from '../utils';

/*
  Learn Landing page:
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

/*
  FAQ:
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

const sanitizeSection = (section: FaqSection): FaqSection => ({
  ...section,
  sectionId: sanitizeID(section.sectionId),
});

const sanitizeFaq = (faq: FaqContent): FaqContent => ({
  ...faq,
  sections: faq.sections.map(sanitizeSection),
});

export const faqContent = sanitizeFaq(faq) as FaqContent;

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

// Interface and utils added when implementing glossary v2, which groups terms by category:

export interface TermsByCategory {
  categoryName: string;
  categoryId: string;
  terms: Term[];
}

export function getGlossaryCategories(): string[] {
  return uniq(map(glossaryContent.terms, 'category'));
}

export function getTermsByCategory(): TermsByCategory[] {
  const categories = getGlossaryCategories();
  return categories.map((category: string) => {
    const termsInCategory = glossaryContent.terms.filter(
      term => term.category === category,
    );
    const categoryToHashId = replace(category, ' ', '-').toLowerCase();
    return {
      categoryName: category,
      categoryId: categoryToHashId,
      terms: termsInCategory,
    };
  });
}

export const glossaryContentByCategory = getTermsByCategory() as TermsByCategory[];

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
  metadataTitle: string;
  metadataDescription: string;
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

const categoryToTermsMap = getTermsByCategory();

// TODO (pablo): Should we have a short heading for categories?
export const learnPages: TocItem[] = [
  {
    label: 'Glossary',
    to: '/glossary',
    items: categoryToTermsMap.map(category => ({
      to: `/glossary#${category.categoryId}`,
      label: category.categoryName,
    })),
  },
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
      label: category.header,
    })),
  },
];

/**
 * Products - landing page:
 **/

export interface LandingPageButton {
  cta: string;
  redirect: string;
}

export interface ProductsLandingSection {
  productName: string;
  productId: string;
  productSubtitle: string;
  productDescription: Markdown;
  buttons: LandingPageButton[];
}

export interface ProductsLandingContent {
  header: string;
  intro?: Markdown;
  productsList: ProductsLandingSection[];
  metadataTitle: string;
  metadataDescription: string;
}

/**
 * Products - full pages:
 **/

export interface BodySection {
  sectionTitle: string;
  sectionId: string;
  sectionBody: Markdown;
}

export interface ProductPageContent {
  productName: string;
  productId: string;
  productIntro: Markdown;
  sections: BodySection[];
  metadataTitle: string;
  metadataDescription: string;
}
