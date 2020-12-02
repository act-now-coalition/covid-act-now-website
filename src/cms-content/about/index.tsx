import aboutPage from './about-page.json';
import { Markdown } from '../utils';

interface LogoItem {
  altText: string;
  image: string;
  url: string;
}

interface PartnersContent {
  copy: Markdown;
  logos: LogoItem[];
}

interface SocialMention {
  name: string;
  handle: string;
  url: string;
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
  socialMentionsIntro: Markdown;
  socialMentionsContent: SocialMention[];
  teamIntro: Markdown;
}

const aboutContent = aboutPage as AboutContent;
export default aboutContent;
