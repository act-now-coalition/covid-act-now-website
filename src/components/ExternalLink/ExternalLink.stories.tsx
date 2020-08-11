import React from 'react';
import '../../index.css';
import '../../App.css';
import ExternalLink from './ExternalLink';

export default {
  title: 'Components/ExternalLink',
  component: ExternalLink,
};

export const InParagraph = () => (
  <p>
    Over the last week, Washington has averaged 745 new confirmed cases per day
    (9.8 for every 100,000 residents). Over the next year, this translates to
    around 270,000 cases and an{' '}
    <ExternalLink href="https://www.globalhealthnow.org/2020-06/us-cases-10x-higher-reported">
      estimated
    </ExternalLink>{' '}
    1,400,000 infections (17.9% of the population).
  </p>
);
