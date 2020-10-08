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
  RESTAURANTS = 'RESTAURANTS',
  BARS = 'BARS',
  MEDICAL_CONDITIONS = 'MEDICAL_CONDITIONS',
  PUBLIC_INTERACTIONS = 'PUBLIC_INTERACTIONS',
  SCHOOLS = 'SCHOOLS',
}

export enum RecommendID {
  MASKS_YELLOW = 'MASKS_YELLOW',
  GATHERINGS_YELLOW = 'GATHERINGS_YELLOW',
  BARS_YELLOW = 'BARS_YELLOW',
  RESTAURANTS_YELLOW = 'RESTAURANTS_YELLOW',
  MEDICAL_CONDITIONS_YELLOW = 'MEDICAL_CONDITIONS_YELLOW',
  PUBLIC_INTERACTIONS_YELLOW = 'PUBLIC_INTERACTIONS_YELLOW',
  PUBLIC_INTERACTIONS_RED = 'PUBLIC_INTERACTIONS_RED',
  MEDICAL_CONDITIONS_RED = 'MEDICAL_CONDITIONS_RED',
  RESTAURANTS_RED = 'RESTAURANTS_RED',
  BARS_RED = 'BARS_RED',
  GATHERINGS_RED = 'GATHERINGS_RED',
  MASKS_RED = 'MASKS_RED',
  SCHOOLS_RED = 'SCHOOLS_RED',
  SCHOOLS_ORANGE = 'SCHOOLS_ORANGE',
  SCHOOLS_YELLOW = 'SCHOOLS_YELLOW',
  SCHOOLS_GREEN = 'SCHOOLS_GREEN',
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
}

export const allIcons = recommendationsMain.icons as RecommendIcon[];
export const mainContent = recommendationsMain as RecommendationsMainContent;
export const modalContent = recommendationsModal as RecommendationsModalContent;
