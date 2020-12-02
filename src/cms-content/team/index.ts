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
import dataVisualization from './data-visualization.json';
import enterprise from './enterprise.json';
import graphicDesign from './graphic-design.json';
import modeling from './modeling.json';
import peopleOperations from './people-operations.json';
import specialProjects from './special-projects.json';

export interface UserProfile {
  fullName: string;
  description?: string;
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
// Leadership/board/advisors first, alumni last, everything else alphabetized
const sortedTeams = [
  leadership,
  board,
  advisors,
  content,
  dataVisualization,
  engineering,
  enterprise,
  graphicDesign,
  growth,
  modeling,
  peopleOperations,
  productManagement,
  socialMedia,
  specialProjects,
  strategy,
  userExperience,
  video,
  alumni,
];

export const teams: Team[] = sortedTeams.map(sanitizeTeam);

export const teamsWithTitles = ['Leadership', 'Board', 'Advisors'];
