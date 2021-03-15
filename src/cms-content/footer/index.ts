import { Markdown } from '../utils';
import footer from './footer.json';

interface LinkItem {
  url: string;
  cta: string;
}

interface FooterContent {
  learnLinks: LinkItem[];
  aboutUs: Markdown;
}

export const footerContent = footer as FooterContent;
