import { sanitizeID } from '../utils';
import leadership from './leadership.json';
import board from './board.json';
import advisors from './advisors.json';
import productManagement from './product-management.json';
import engineering from './engineering.json';
import userExperience from './user-experience.json';
import strategy from './strategy.json';
import alumni from './alumni.json';
import peopleOperations from './people-operations.json';
import specialProjects from './special-projects.json';
import legalCounsel from './legal-counsel.json';

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
    teamMembers:
      team.teamMembers.map((m: UserProfile) => {
        return {
          ...m,
          fullName: m.fullName.trim(),
          description: m.description?.trim() ?? '',
        };
      }) || [],
  };
}

const allTeams = [
  leadership,
  board,
  advisors,
  engineering,
  peopleOperations,
  productManagement,
  specialProjects,
  strategy,
  userExperience,
  alumni,
  legalCounsel,
];

/*
  We are now removing categories for all teams other than leadership, board, advisors, and alumni
*/
const individuallyGroupedTeams = [
  'Leadership',
  'Board',
  'Advisors',
  'Alumni',
  'Legal Counsel',
];

const combinedTeamMembers = allTeams
  .filter(team => !individuallyGroupedTeams.includes(team.teamName))
  .reduce((acc: any[], curr: Team) => [...curr.teamMembers, ...acc], []);

const combinedTeamObj = {
  teamName: 'Team',
  teamID: 'team',
  teamMembers: combinedTeamMembers,
};

const groupedTeams = [
  leadership,
  combinedTeamObj,
  board,
  legalCounsel,
  advisors,
  alumni,
];

export const teams: Team[] = groupedTeams.map(sanitizeTeam);

/*
  Including titles only for these 4 team categories:
*/
export const teamsWithTitles = [
  'Leadership',
  'Board',
  'Advisors',
  'Legal Counsel',
];
