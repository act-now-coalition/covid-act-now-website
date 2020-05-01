import React from 'react';

import {
  Grid,
  TeamMember,
  TeamMemberName,
  TeamMemberRole,
  TeamMemberTitle,
} from './HeadshotGrid.style';
export { HeadshotGrid2Up } from './HeadshotGrid.style';

const HeadshotGrid = ({
  people,
}: {
  people: {
    name: string;
    headshot?: string;
    role?: string;
    title: string;
    link: string;
  }[];
}) => {
  return (
    <Grid>
      {people.map((teammate, idx) => {
        return (
          <TeamMember key={idx}>
            {teammate.headshot && (
              <img
                src={`/images/team/${teammate.headshot}`}
                alt={teammate.name}
              />
            )}
            <TeamMemberName>{teammate.name}</TeamMemberName>
            {teammate.role && <TeamMemberRole>{teammate.role}</TeamMemberRole>}
            {teammate.title && (
              <TeamMemberTitle>{teammate.title}</TeamMemberTitle>
            )}
          </TeamMember>
        );
      })}
    </Grid>
  );
};

export default HeadshotGrid;
