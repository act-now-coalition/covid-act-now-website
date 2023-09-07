import React, { Fragment } from 'react';
import { teams } from 'cms-content/team';
import { AboutHeading3, TeamGroupContainer } from '../About.style';
import sortBy from 'lodash/sortBy';
import Grid from '@material-ui/core/Grid';
import ActiveMember from './ActiveMember';
import AlumniMember from './AlumniMember';

const TeamSection = () => {
  return (
    <Fragment>
      {teams.map(team => {
        const alphabetizedTeam = sortBy(
          team.teamMembers,
          member => member.fullName,
        );
        const teamMembers =
          team.teamName === 'Leadership' ? team.teamMembers : alphabetizedTeam;
        const isAlumni = team.teamName === 'Alumni';
        const isAdvisor = team.teamName === 'Advisors';
        const isBoard = team.teamName === 'Board';
        const includeTitle = false;
        return !isAlumni && !isAdvisor && !isBoard ? (
          <Fragment key={team.teamName}>
            <AboutHeading3>{team.teamName}</AboutHeading3>
            <TeamGroupContainer>
              <Grid container spacing={3}>
                {teamMembers.map((teamMember, i) => {
                  return (
                    <ActiveMember
                      teamMember={teamMember}
                      includeTitle={includeTitle}
                      key={teamMember.fullName}
                    />
                  );
                })}
              </Grid>
            </TeamGroupContainer>
          </Fragment>
        ) : (
          <Fragment key={team.teamName}>
            <AboutHeading3>{team.teamName}</AboutHeading3>
            <div>
              {teamMembers.map<React.ReactNode>(teamMember => {
                return (
                  <AlumniMember
                    teamMember={teamMember}
                    key={teamMember.fullName}
                  />
                );
              })}
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default TeamSection;
