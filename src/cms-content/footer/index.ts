import { Markdown } from '../utils';
import footer from './footer.json';

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
  learn: Markdown;
  aboutUs: Markdown;
}

const { learn, aboutUs } = footer;

export const menuContent = { learn, aboutUs } as MenuContent;
