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
  copy: Markdown;
  logos: LogoItem[];
}

interface AboutContent {
  pageHeader: string; // deprecated
  introHeader: string; // deprecated
  introContent: Markdown; // deprecated
  aboutHeader: string;
  aboutContent: Markdown;
  missionHeader: string;
  missionContent: Markdown;
  commitmentsContent: CommitmentsContent[];
  impactHeader: string;
  impactContent: Markdown;
  contactUsHeader: string;
  contactUsContent: Markdown;
  partnersHeader: string;
  partnersContent: PartnersContent[];
  whoWeServeHeader: string; // deprecated
  whoWeServeContentA: Markdown; // deprecated
  whoWeServeContentB: Markdown; // deprecated
  governmentLogos: LogoItem[]; // deprecated
  teamHeader: string;
  teamIntro: Markdown;
  futureProjectsHeader: string;
  futureProjectsContent: Markdown;
  joinUsHeader: string; // deprecated
  joinUsContent: Markdown; // deprecated
}

const aboutContent = aboutPage as AboutContent;
export default aboutContent;
