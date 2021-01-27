import React, { Fragment } from 'react';
import { Region } from 'common/regions';
import Grid from '@material-ui/core/Grid';
import { Heading2, Paragraph } from './RegionVaccinationBlock.style';
import FeedbackBox from './FeedbackBox';
import { StateLinkButton } from './StateVaccionationBlock.style';
import { trackVaccinationLink } from './utils';

const StateVaccinationBlock: React.FC<{ region: Region }> = ({ region }) => {
  // TODO: Update with the eligibility and options links
  const eligibilityUrl = '';
  const optionsUrl = '';

  if (!eligibilityUrl || !optionsUrl) {
    return null;
  }

  return (
    <Fragment>
      <Heading2>How to get vaccinated</Heading2>
      <Paragraph>
        Depending on your location, you may have to schedule an appointment or
        get on a waitlist.
      </Paragraph>
      <Grid container spacing={1}>
        {eligibilityUrl && (
          <Grid item xs={12} md={6} key="eligibility">
            <StateLinkButton
              href={eligibilityUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackVaccinationLink(`Eligibiligy: ${region.fullName}`)
              }
            >
              Check eligibility
            </StateLinkButton>
          </Grid>
        )}
        {optionsUrl && (
          <Grid item xs={12} md={6} key="see-options">
            <StateLinkButton
              href={optionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackVaccinationLink(`Options: ${region.fullName}`)
              }
            >
              See vaccination options
            </StateLinkButton>
          </Grid>
        )}
      </Grid>
      <FeedbackBox />
    </Fragment>
  );
};

export default StateVaccinationBlock;
