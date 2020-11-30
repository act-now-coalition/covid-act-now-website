import React from 'react';
import { Header, BodyCopy } from './LearnMoreModal.style';
import ExternalLink from 'components/ExternalLink';

const LearnMoreContent: React.FC<{ closeDialog: () => void }> = ({
  closeDialog,
}) => (
  <BodyCopy>
    We aggregated case and death figures among counties whose populations are
    over 50% Native American according to the{' '}
    <ExternalLink href="https://www.census.gov/history/pdf/c2010br-10.pdf">
      2010 US Census
    </ExternalLink>
    . This represents approximately 10% of the total Native American population.
    This is due to a{' '}
    <ExternalLink href="https://blog.covidactnow.org/covid-native-american-counties/">
      large reporting gap in race
    </ExternalLink>
    .
    <ul>
      <li>
        <ExternalLink href="https://blog.covidactnow.org/covid-native-american-counties/">
          View our observations
        </ExternalLink>
      </li>
      <li onClick={closeDialog}>Return to chart</li>
    </ul>
  </BodyCopy>
);

const LearnMoreTitle: React.FC = () => (
  <Header>Native American majority counties</Header>
);

export { LearnMoreContent, LearnMoreTitle };
