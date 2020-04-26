import React from 'react';

import { TeamTable, TeamMember, TeamMemberCell } from './TeamTable.style';

const About = ({
  people,
}: {
  people: { name: string; title: string; link: string }[];
}) => {
  return (
    <TeamTable>
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
    </TeamTable>
  );
};

export default About;
