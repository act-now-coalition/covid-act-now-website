import React from 'react';

import { TeamTableGrid, TeamMember, TeamMemberCell } from './TeamTable.style';
import {
  TeamMemberName,
  TeamMemberTitle,
} from '../HeadshotGrid/HeadshotGrid.style';

const TeamTable = ({
  people,
  isTeam,
}: {
  people: { name: string; title: string; link?: string }[];
  isTeam?: Boolean;
}) => {
  return (
    <TeamTableGrid>
      {people.map((teammate, idx) => {
        return (
          <TeamMember key={idx}>
            <TeamMemberCell variant="body1" component="p">
              {isTeam && (
                <a
                  href={teammate.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {teammate.name}
                </a>
              )}
              {!isTeam && <TeamMemberName>{teammate.name}</TeamMemberName>}
            </TeamMemberCell>
            <TeamMemberTitle>
              <span dangerouslySetInnerHTML={{ __html: teammate.title }} />
            </TeamMemberTitle>
          </TeamMember>
        );
      })}
    </TeamTableGrid>
  );
};

export default TeamTable;
