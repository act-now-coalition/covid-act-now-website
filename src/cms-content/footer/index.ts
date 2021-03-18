import { Markdown } from '../utils';
import footer from './footer.json';

export interface LinkItem {
  url: string;
  cta: string;
}

export enum SectionId {
  API = 'API',
  DAILY_DOWNLOAD = 'DAILY_DOWNLOAD',
  ALERTS = 'ALERTS',
}

export interface FeaturedItem {
  cta: string;
  url: string;
  description: string;
  iconId: SectionId;
}

interface FooterContent {
  learnLinks: LinkItem[];
  aboutUs: Markdown;
  featuredSections: FeaturedItem[];
}

export const footerContent = footer as FooterContent;
