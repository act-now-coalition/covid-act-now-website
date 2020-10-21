import faq from './learn-faq.json';

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

export const faqContent = faq as FaqContent;
