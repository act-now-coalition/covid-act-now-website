export enum CommunityLevel {
  LOW,
  MEDIUM,
  HIGH,
}

export const ALL_COMMUNITY_LEVELS = [
  CommunityLevel.LOW,
  CommunityLevel.MEDIUM,
  CommunityLevel.HIGH,
];

export interface CommunityLevelInfo {
  communityLevel: CommunityLevel;
  upperLimit: number;
  name: string;
  color: string;
  summary?: string;
  detail(locationName?: string): string | React.ReactElement;
}

export interface CommunityLevelInfoMap {
  [CommunityLevel.LOW]: CommunityLevelInfo;
  [CommunityLevel.MEDIUM]: CommunityLevelInfo;
  [CommunityLevel.HIGH]: CommunityLevelInfo;
}
