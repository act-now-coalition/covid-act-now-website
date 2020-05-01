import React from 'react';

import { TeamTableGrid, TeamMember, TeamMemberCell } from './TeamTable.style';

const TeamTable = ({
  people,
}: {
  people: { name: string; title: string; link: string }[];
}) => {
  return (
    <TeamTableGrid>
      {people.map((teammate, idx) => {
        return (
          <TeamMember key={idx}>
            <TeamMemberCell variant="body1" component="p">
              <a href={teammate.link} target="_blank" rel="noopener noreferrer">
                {teammate.name}
              </a>
            </TeamMemberCell>
            <TeamMemberCell variant="body1" component="p">
              <span dangerouslySetInnerHTML={{ __html: teammate.title }} />
            </TeamMemberCell>
          </TeamMember>
        );
      })}
    </TeamTableGrid>
  );
};

export default TeamTable;
