export enum CommunityLevel {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
  UNKNOWN = 4,
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
