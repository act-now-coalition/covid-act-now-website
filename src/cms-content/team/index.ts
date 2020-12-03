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

const allTeams = [
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

/*
  We are now removing categories for all teams other than leadership, board, advisors, and alumni
*/
const individuallyGroupedTeams = ['Leadership', 'Board', 'Advisors', 'Alumni'];

const combinedTeamMembers = allTeams
  .filter(team => !individuallyGroupedTeams.includes(team.teamName))
  .reduce((acc: any[], curr: Team) => [...curr.teamMembers, ...acc], []);

const combinedTeamObj = {
  teamName: 'Team',
  teamID: 'team',
  teamMembers: combinedTeamMembers,
};

const groupedTeams = [leadership, board, advisors, combinedTeamObj, alumni];

export const teams: Team[] = groupedTeams.map(sanitizeTeam);

/*
  Including titles only for these 3 team categories:
*/
export const teamsWithTitles = ['Leadership', 'Board', 'Advisors'];
