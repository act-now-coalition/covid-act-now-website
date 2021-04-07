import { Markdown } from '../utils';
import shuffle from 'lodash/shuffle';
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

interface MenuContent {
  learnLinks: LinkItem[];
  aboutUs: Markdown;
  featuredSections: FeaturedItem[];
}

const { learnLinks, aboutUs, featuredSections } = footer;

const menuContentWithShuffleLearnLinks = {
  learnLinks: shuffle(learnLinks),
  aboutUs,
  featuredSections,
};

export const menuContent = menuContentWithShuffleLearnLinks as MenuContent;
