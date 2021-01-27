import React, { Fragment } from 'react';
import { Region } from 'common/regions';
import { Heading2, Paragraph } from './RegionVaccinationBlock.style';
import FeedbackBox from './FeedbackBox';
import { EventCategory, EventAction, trackEvent } from 'components/Analytics';

const StateVaccinationBlock: React.FC<{ region: Region }> = ({ region }) => {
  return (
    <Fragment>
      <Heading2>How to get vaccinated</Heading2>
      <Paragraph>
        Depending on your location, you may have to schedule an appointment or
        get on a waitlist.
      </Paragraph>
      <FeedbackBox />
    </Fragment>
  );
};

export default StateVaccinationBlock;
