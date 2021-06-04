import React from 'react';
import { AlumniWrapper, AlumniName } from './Team.style';
import ExternalLink from 'components/ExternalLink';
import { UserProfile } from 'cms-content/team';

const AlumniMember = (props: { teamMember: UserProfile }) => {
  const { teamMember } = props;
  // ensure no trailing spaces from CMS
  const fullName = teamMember.fullName?.trim();
  const { profileUrl } = teamMember;

  return (
    <AlumniWrapper>
      <ExternalLink href={profileUrl}>
        <AlumniName>{fullName}</AlumniName>
      </ExternalLink>
    </AlumniWrapper>
  );
};

export default AlumniMember;
