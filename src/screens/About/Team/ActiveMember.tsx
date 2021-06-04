import React from 'react';
import { Headshot, TeamMemberWrapper, DescriptionWrapper } from './Team.style';
import { Paragraph } from 'components/Markdown';
import ExternalLink from 'components/ExternalLink';
import { UserProfile } from 'cms-content/team';

const ActiveMember: React.FC<{
  teamMember: UserProfile;
  includeTitle: boolean;
}> = ({ teamMember, includeTitle }) => {
  // ensure no trailing spaces from CMS
  const fullName = teamMember.fullName?.trim();
  const description = teamMember.description?.trim();
  const { profileImgUrl, profileUrl } = teamMember;
  return (
    <TeamMemberWrapper item sm={6} xs={12}>
      <Headshot src={profileImgUrl} alt={`headshot of ${fullName}`} />
      <ExternalLink href={profileUrl}>
        <DescriptionWrapper>
          <strong>{fullName}</strong>
          {includeTitle && <Paragraph>{description}</Paragraph>}
        </DescriptionWrapper>
      </ExternalLink>
    </TeamMemberWrapper>
  );
};

export default ActiveMember;
