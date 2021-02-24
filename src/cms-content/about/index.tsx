import aboutPage from './about-page.json';
import { Markdown } from '../utils';

export interface LogoItem {
  altText: string;
  image: string;
  url: string;
}

interface PartnersContent {
  copy: Markdown;
  logos: LogoItem[];
}

interface AboutContent {
  pageHeader: string;
  introHeader: string;
  introContent: Markdown;
  contactUsHeader: string;
  contactUsContent: Markdown;
  partnersHeader: string;
  partnersContent: PartnersContent[];
  whoWeServeHeader: string;
  whoWeServeContentA: Markdown;
  whoWeServeContentB: Markdown;
  governmentLogos: LogoItem[];
  teamHeader: string;
  teamIntro: Markdown;
  joinUsHeader: string;
  joinUsContent: Markdown;
}

const aboutContent = aboutPage as AboutContent;
export default aboutContent;
