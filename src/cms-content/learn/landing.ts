import landing from './learn-landing.json';
import { Markdown } from '../utils';

/*
  Learn Landing page:
*/

export interface LandingSection {
  sectionTitle: string;
  sectionId: string;
  description: Markdown;
  buttonCta: string;
  buttonRedirect: string;
}

export interface LandingContent {
  header: string;
  intro: Markdown;
  sections: LandingSection[];
  metadataTitle: string;
  metadataDescription: string;
}

export const landingPageContent = landing as LandingContent;
