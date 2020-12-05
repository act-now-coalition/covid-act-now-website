import React from 'react';
import {
  TeamMemberWrapper,
  DescriptionWrapper,
  AlumniName,
} from './Team.style';
import ExternalLink from 'components/ExternalLink';
import { UserProfile } from 'cms-content/team';

const AlumniMember = (props: { teamMember: UserProfile }) => {
  const { teamMember } = props;

  return (
    <TeamMemberWrapper item sm={4} xs={6}>
      <ExternalLink href={teamMember.profileUrl}>
        <DescriptionWrapper>
          <AlumniName>{teamMember.fullName}</AlumniName>
        </DescriptionWrapper>
      </ExternalLink>
    </TeamMemberWrapper>
  );
};

export default AlumniMember;
