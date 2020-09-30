import content from './donate-page.json';

type MarkdownString = string;

interface Section {
  title: string;
  copy: MarkdownString;
}

export interface DonatePageContent {
  headerLines: string[];
  intro: MarkdownString;
  sections: Section[];
}

export default content as DonatePageContent;
