import React from 'react';
import { Headshot, TeamMemberWrapper, DescriptionWrapper } from './Team.style';
import { Paragraph } from 'components/Markdown';
import ExternalLink from 'components/ExternalLink';
import { UserProfile } from 'cms-content/team';

const ActiveMember = (props: {
  teamMember: UserProfile;
  includeTitle: boolean;
}) => {
  const { teamMember, includeTitle } = props;

  return (
    <TeamMemberWrapper item sm={6} xs={12}>
      <Headshot src={teamMember.profileImgUrl} />
      <ExternalLink href={teamMember.profileUrl}>
        <DescriptionWrapper>
          <strong>{teamMember.fullName}</strong>
          {includeTitle && <Paragraph>{teamMember.description}</Paragraph>}
        </DescriptionWrapper>
      </ExternalLink>
    </TeamMemberWrapper>
  );
};

export default ActiveMember;
