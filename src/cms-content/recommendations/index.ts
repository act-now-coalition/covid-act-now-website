import recommendationsMain from './recommendations-main.json';
import recommendationsModal from './recommendations-modal.json';

// Type Aliases
type Markdown = string;
type ImageUrl = string;

export enum RecommendationSource {
  FED = 'FED',
  HARVARD = 'HARVARD',
  NONE = 'NONE',
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
  BARS = 'BARS',
  GYMS = 'GYMS',
  RESTAURANTS = 'RESTAURANTS',
  MASKS = 'MASKS',
  GATHERINGS = 'GATHERINGS',
  SCHOOLS = 'SCHOOLS',
  TRAVEL = 'TRAVEL',
  EXPOSURE_APP = 'EXPOSURE_APP',
}

export enum RecommendID {
  GATHERINGS_RED = 'GATHERINGS_RED',
  GATHERINGS_YELLOW = 'GATHERINGS_YELLOW',
  RESTAURANTS_RED = 'RESTAURANTS_RED',
  RESTAURANTS_YELLOW = 'RESTAURANTS_YELLOW',
  BARS_RED = 'BARS_RED',
  BARS_YELLOW = 'BARS_YELLOW',
  GYMS_RED = 'GYMS_RED',
  GYMS_YELLOW = 'GYMS_YELLOW',
  MASKS_RED = 'MASKS_RED',
  MASKS_YELLOW = 'MASKS_YELLOW',
  SCHOOLS_RED = 'SCHOOLS_RED',
  SCHOOLS_ORANGE = 'SCHOOLS_ORANGE',
  SCHOOLS_YELLOW = 'SCHOOLS_YELLOW',
  SCHOOLS_GREEN = 'SCHOOLS_GREEN',
  EXPOSURE_APP = 'EXPOSURE_APP',
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

export interface RecommendationWithIcon {
  recommendationInfo: Recommendation;
  iconInfo: RecommendIcon;
  index: number;
}

export const allIcons = recommendationsMain.icons as RecommendIcon[];
export const mainContent = recommendationsMain as RecommendationsMainContent;
export const modalContent = recommendationsModal as RecommendationsModalContent;
