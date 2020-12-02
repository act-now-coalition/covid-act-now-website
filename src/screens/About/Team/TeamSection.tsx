import React, { Fragment } from 'react';
import { teams, teamsWithTitles } from 'cms-content/team';
import { AboutHeading3 } from '../About.style';
import { sortBy } from 'lodash';
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
        const teamToMap =
          team.teamName === 'Leadership' ? team.teamMembers : alphabetizedTeam;
        const isAlumni = team.teamName === 'Alumni';
        const includeTitle = teamsWithTitles.includes(team.teamName);
        return (
          <Fragment>
            <AboutHeading3>{team.teamName}</AboutHeading3>
            <Grid container spacing={3}>
              {teamToMap.map((teamMember, i) => {
                return isAlumni ? (
                  <AlumniMember teamMember={teamMember} />
                ) : (
                  <ActiveMember
                    teamMember={teamMember}
                    includeTitle={includeTitle}
                  />
                );
              })}
            </Grid>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default TeamSection;
