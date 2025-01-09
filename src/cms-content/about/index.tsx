import aboutPage from './about-page.json';
import { Markdown } from '../utils';

export interface LogoItem {
  altText: string;
  image: string;
  url: string;
}

export interface CommitmentsContent {
  icon: string;
  altText: string;
  copy: Markdown;
}

export interface PartnersContent {
  header: string;
  logos: LogoItem[];
}

interface AboutContent {
  aboutHeader: string;
  aboutContent: Markdown;
  missionContent: Markdown;
  commitmentsContent: CommitmentsContent[];
  impactHeader: string;
  impactContent: Markdown;
  partnersHeader: string;
  partnersContent: PartnersContent[];
  teamHeader: string;
  teamIntro: Markdown;
  contactUsHeader: string;
  contactUsContent: Markdown;
}

const aboutContent = aboutPage as AboutContent;
export default aboutContent;
