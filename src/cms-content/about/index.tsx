import aboutPage from './about-page.json';
import { Markdown } from '../utils';

export interface LogoItem {
  altText: string;
  image: string;
  url?: string;
}

interface PartnersContent {
  copy: Markdown;
  logos: LogoItem[];
}

interface AboutContent {
  pageHeader: string;
  introHeader: string;
  introContent: Markdown;
  partnersHeader: string;
  partnersContent: PartnersContent[];
  whoWeServeHeader: string;
  whoWeServeContent: Markdown;
  governmentLogos: LogoItem[];
  teamHeader: string;
  teamIntro: Markdown;
}

const aboutContent = aboutPage as AboutContent;
export default aboutContent;
