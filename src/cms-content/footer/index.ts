import { Markdown } from '../utils';
import footer from './footer.json';

export interface LinkItem {
  url: string;
  cta: string;
}

export interface FeaturedItem {
  cta: string;
  url: string;
  description: string;
  iconId: string;
}

interface FooterContent {
  learnLinks: LinkItem[];
  aboutUs: Markdown;
  featuredSections: FeaturedItem[];
}

export const footerContent = footer as FooterContent;
