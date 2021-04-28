import React from 'react';
import NotesBlock from './NotesBlock';
import VulnerabilityIcon from 'assets/images/VulnerabilityIcon';
import { isHighVulnerability } from './utils';
import { EventCategory } from 'components/Analytics';

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
    <NotesBlock
      icon={<VulnerabilityIcon />}
      title={title}
      redirectUrl={redirectUrl}
      trackingCategory={EventCategory.VULNERABILITIES}
    >
      {body}
    </NotesBlock>
  );
};
