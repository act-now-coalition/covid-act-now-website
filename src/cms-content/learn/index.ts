import { chain, keyBy, reject } from 'lodash';
import faq from './learn-faq.json';
import glossary from './learn-glossary.json';
import landing from './learn-landing.json';
import caseStudies from './learn-case-studies.json';
import productsLanding from './products-landing.json';
import productPages from './products-full-pages.json';
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
  questionId: string;
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

export const productsLandingContent = productsLanding as ProductsLandingContent;

/**
 * Products - full pages:
 **/

export interface BodySection {
  sectionTitle: string;
  sectionId: string;
  sectionBody: Markdown;
}

export interface ProductPage {
  productName: string;
  productId: string;
  productIntro: Markdown;
  sections: BodySection[];
  metadataTitle: string;
  metadataDescription: string;
}

export interface ProductPageContent {
  product: ProductPage[];
}

export const productPageContent = productPages as ProductPageContent;

// Used to get full-page product content by product ID
export function getProductPageContent(
  productLandingId: string,
): ProductPage | undefined {
  return productPages.product.find(item => item.productId === productLandingId);
}

// TODO (pablo): Should we have a short heading for categories?
export const learnPages: TocItem[] = [
  {
    label: 'Glossary',
    to: '/glossary',
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
    label: 'Articles',
    to: '/articles',
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
