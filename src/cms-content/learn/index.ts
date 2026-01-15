import keyBy from 'lodash/keyBy';
import reject from 'lodash/reject';
import partition from 'lodash/partition';
import flatten from 'lodash/flatten';
import map from 'lodash/map';
import property from 'lodash/property';
import faq from './learn-faq.json';
import caseStudies from './learn-case-studies.json';
import metricExplainers from './metric-explainers.json';
import footer from './footer.json';
import { sanitizeID, Markdown, TocItem } from '../utils';

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
  intro?: Markdown;
  lastUpdatedDate: string;
  sections: FaqSection[];
  metadataTitle: string;
  metadataDescription: string;
}

// Hiding outdated FAQ questions:
const idsToHide = [
  'when-will-you-be-eligible-vaccine',
  'what-locations-do-you-have-vaccine-eligibility-information-for',
  'how-get-vaccine-eligibility-information-and-how-often-updated',
  'long-term-effects-covid',
];

const removeHiddenQuestionsById = (questions: Question[]) => {
  return questions.filter(
    (question: Question) => !idsToHide.includes(question.questionId),
  );
};

const sanitizeSection = (section: FaqSection): FaqSection => ({
  ...section,
  questions: removeHiddenQuestionsById(section.questions),
  sectionId: sanitizeID(section.sectionId),
});

const sanitizeFaq = (faq: FaqContent): FaqContent => ({
  ...faq,
  sections: faq.sections.map(sanitizeSection),
});

export const faqContent = sanitizeFaq(faq) as FaqContent;

export const faqQuestionItems = flatten(
  map(faqContent.sections, property('questions')),
);

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
  tags?: string[];
  showCaseStudy: boolean;
}

export interface CaseStudyCategory {
  header: string;
  categoryId: string;
  caseStudies: CaseStudy[];
}

export interface CaseStudiesContent {
  header: string;
  intro?: Markdown;
  categories: CaseStudyCategory[];
  metadataTitle: string;
  metadataDescription: string;
}

export const allCaseStudies = flatten(
  map(caseStudies.categories, category => category.caseStudies),
);

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

/* We have previously set certain case studies as hidden via hard-coding a filter.
  We now have the ability to hide them via a switch in the CMS.
  This function+filter make sure that we dont render a table of contents item
  for categories in which all case studies are hidden:
*/
function showCategory(category: CaseStudyCategory) {
  return (
    category.caseStudies.filter((study: CaseStudy) => study.showCaseStudy)
      .length > 0
  );
}

export const categoriesWithStudies = caseStudiesContent.categories.filter(
  category => showCategory(category),
);

/**
 * Metric Explainers:
 **/
export interface ExplainerQuestion {
  question?: string;
  questionId: string;
  answer: Markdown;
}

interface Section {
  sectionHeader: string;
  sectionSubheader: string;
  sectionId: string;
  sectionIntro: Markdown;
  questions: ExplainerQuestion[];
}

interface LogoItem {
  altText: string;
  image: string;
  url: string;
}

export interface MetricExplainersContent {
  pageHeader: string;
  pageIntro?: string;
  sections: Section[];
  frameworkLogos: LogoItem[];
  metadataTitle: string;
  metadataDescription: string;
}

export const metricExplainersContent = metricExplainers as MetricExplainersContent;
export const [introSection, metricSections] = partition(
  metricExplainersContent.sections,
  section => section.sectionId === 'how-covid-risk-is-determined',
);

/**
 * Footer:
 **/

interface Footer {
  body: Markdown;
}

export const footerContent = footer as Footer;

// TODO (pablo): Should we have a short heading for categories?
export const learnPages: TocItem[] = [
  {
    label: caseStudiesContent.header,
    to: '/case-studies',
    items: categoriesWithStudies.map(category => ({
      to: `/case-studies#${category.categoryId}`,
      label: category.header,
    })),
  },
];
