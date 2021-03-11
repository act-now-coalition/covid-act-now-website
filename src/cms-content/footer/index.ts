import { Markdown } from '../utils';

interface LinkItem {
  url: string;
  cta: string;
}

interface FooterContent {
  learnLinks: LinkItem[];
  aboutUs: Markdown;
}
