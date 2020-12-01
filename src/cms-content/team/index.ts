import { sanitizeID } from '../utils';
import leadership from './leadership.json';
import board from './board.json';
import advisors from './advisors.json';
import productManagement from './product-management.json';
import engineering from './engineering.json';
import userExperience from './user-experience.json';
import socialMedia from './social-media.json';
import growth from './growth.json';
import video from './video.json';
import content from './content.json';
import strategy from './strategy.json';
import alumni from './alumni.json';

export interface UserProfile {
  fullName: string;
  description: string;
  profileUrl: string;
  profileImgUrl: string;
}

export interface Team {
  teamName: string;
  teamID: string;
  teamMembers: UserProfile[];
}

function sanitizeTeam(team: Team): Team {
  return {
    ...team,
    teamID: sanitizeID(team.teamID),
    teamMembers: team.teamMembers || [],
  };
}

// Teams will appear in this order on the About page
const sortedTeams = [
  leadership,
  board,
  advisors,
  productManagement,
  engineering,
  userExperience,
  socialMedia,
  growth,
  video,
  content,
  strategy,
  alumni,
];

export const teams: Team[] = sortedTeams.map(sanitizeTeam);
