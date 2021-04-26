import React from 'react';
import NotesBlock from './NotesBlock';
import VulnerabilityIcon from 'assets/images/VulnerabilityIcon';
import { StyledBaseButton } from './NotesBlock.style';
import { EventAction, EventCategory } from 'components/Analytics';
import { isHighVulnerability } from './utils';

export default {
  title: 'Location page redesign/Notes Block',
  component: NotesBlock,
};

const highVulnerability = isHighVulnerability(1);
const title = 'Vulnerability is very high';
const body =
  'New York City metro is more likely to experience severe physical and economic suffering from COVID, and to face harder, longer recovery.';
const redirectUrl = 'http://www.google.com';

export const Example = () => {
  if (!highVulnerability) {
    return null;
  }
  return (
    <StyledBaseButton
      trackingCategory={EventCategory.NONE}
      trackingAction={EventAction.NAVIGATE}
      trackingLabel="Test vulnerability block"
      href={redirectUrl}
    >
      <NotesBlock icon={<VulnerabilityIcon />} title={title}>
        {body}
      </NotesBlock>
    </StyledBaseButton>
  );
};
