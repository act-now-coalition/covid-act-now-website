import faq from './learn-faq.json';
import { sanitizeID } from './utils';

type Markdown = string;

/*
  For FAQ:
*/
export interface Question {
  question: Markdown;
  answer: Markdown;
}

export interface Section {
  sectionTitle: string;
  sectionId: string;
  questions: Question[];
}

export interface FaqContent {
  header: string;
  sections: Section[];
}

function sanitizeSection(section: Section): Section {
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
