import { sanitizeID } from '../utils';
import leadership from './leadership.json';
import board from './board.json';
import advisors from './advisors.json';
import productManagement from './product-management.json';
import engineering from './engineering.json';
import strategy from './strategy.json';
import alumni from './alumni.json';
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
  productManagement,
  strategy,
  alumni,
  legalCounsel,
];

/*
  We are now removing categories for all teams other than leadership, board, advisors, and alumni
*/
const individuallyGroupedTeams = [
  'Board',
  'Advisors',
  'Alumni',
  'Legal Counsel',
];

const combinedTeamMembers = allTeams
  .filter(team => !individuallyGroupedTeams.includes(team.teamName))
  .reduce((acc: any[], curr: Team) => [...curr.teamMembers, ...acc], []);

const combinedTeamObj = {
  teamName: 'Current Maintainers',
  teamID: 'team',
  teamMembers: combinedTeamMembers,
};

const groupedTeams = [combinedTeamObj, legalCounsel, board, advisors, alumni];

export const teams: Team[] = groupedTeams.map(sanitizeTeam);
