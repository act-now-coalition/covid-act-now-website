import recommendationsMain from './recommendations-main.json';
import recommendationsModal from './recommendations-modal.json';

// Type Aliases
type Markdown = string;
type ImageUrl = string;

export enum RecommendationSource {
  FED = 'FED',
  HARVARD = 'HARVARD',
}

export enum FedLevel {
  RED = 'RED',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
}

export enum HarvardLevel {
  RED = 'RED',
  ORANGE = 'ORANGE',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
}

export enum RecommendCategory {
  MASKS = 'MASKS',
  GATHERINGS = 'GATHERINGS',
  SCHOOLS = 'SCHOOLS',
  RESTAURANTS = 'RESTAURANTS',
}

export enum RecommendID {
  MASKS_INDOORS = 'masks-indoors',
  GATHERINGS_OUTDOORS = 'gatherings-outdoors',
  SCHOOLS_ORANGE = 'schools-orange',
  RESTAURANTS_25_PERCENT = 'restaurants-indoor-25-percent',
}

export interface Recommendation {
  body: Markdown;
  source: RecommendationSource;
  level: FedLevel | HarvardLevel;
  category: RecommendCategory;
  id: RecommendID;
}

export interface RecommendIcon {
  category: RecommendCategory;
  altText: string;
  iconImage: ImageUrl;
}

interface FullFedLevel {
  color: FedLevel;
  content: Markdown;
}

interface FullHarvardLevel {
  color: HarvardLevel;
  content: Markdown;
}

export interface RecommendationsMainContent {
  header: string;
  recommendations: Recommendation[];
  footer: {
    feedbackButtonLabel: string;
    modalButtonLabel: string;
    shareText: Markdown;
  };
  icons: RecommendIcon[];
}

export interface RecommendationsModalContent {
  header: string;
  federalTaskForce: {
    sourceName: string;
    description: Markdown;
    levels: FullFedLevel[];
  };
  harvard: {
    sourceName: string;
    description: Markdown;
    levels: FullHarvardLevel[];
  };
}

//TODO (chelsi): fix the any
const allIcons: any[] = recommendationsMain.icons;
export { allIcons as AllIcons };
export const mainContent = recommendationsMain as RecommendationsMainContent;
export const modalContent = recommendationsModal as RecommendationsModalContent;
