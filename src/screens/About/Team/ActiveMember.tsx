import React from 'react';
import { Headshot, TeamMemberWrapper, DescriptionWrapper } from './Team.style';
import { Paragraph } from 'components/Markdown';
import ExternalLink from 'components/ExternalLink';

const ActiveMember = (props: { teamMember: any }) => {
  const { teamMember } = props;

  return (
    <TeamMemberWrapper item sm={6} xs={12}>
      <Headshot src={teamMember.profileImgUrl} />
      <ExternalLink href={teamMember.profileUrl}>
        <DescriptionWrapper>
          <strong>{teamMember.fullName}</strong>
          <Paragraph>{teamMember.description}</Paragraph>
        </DescriptionWrapper>
      </ExternalLink>
    </TeamMemberWrapper>
  );
};

export default ActiveMember;
