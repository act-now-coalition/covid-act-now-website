import React from 'react';

import { DisclaimerWrapper, DisclaimerBody } from './Disclaimer.style';
import LightTooltip from 'components/LightTooltip/LightTooltip';
import { useModelLastUpdatedDate } from 'utils/model';

const Disclaimer = ({ children }: { children: React.ReactNode }) => {
  const lastUpdatedDate: Date = useModelLastUpdatedDate() || new Date();
  return (
    <DisclaimerWrapper>
      <DisclaimerBody>
        <LightTooltip
          title="Currently we aggregate data over 4 day intervals to smooth out inconsistencies in the source data. We’re working on improving this now."
          placement="bottom"
        >
          <span>
            Last updated on{' '}
            {lastUpdatedDate && lastUpdatedDate.toLocaleDateString()}.
          </span>
        </LightTooltip>{' '}
        {children}{' '}
        <a
          href="https://data.covidactnow.org/Covid_Act_Now_Model_References_and_Assumptions.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about our projection and its limitations
        </a>
        .
      </DisclaimerBody>
    </DisclaimerWrapper>
  );
};

export default Disclaimer;
