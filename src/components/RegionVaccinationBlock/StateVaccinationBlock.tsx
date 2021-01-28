import React, { Fragment } from 'react';
import { Region } from 'common/regions';
import Grid from '@material-ui/core/Grid';
import { getVaccinationDataByRegion } from 'cms-content/vaccines';
import FeedbackBox from './FeedbackBox';
import Header from './Header';
import { StateLinkButton } from './StateVaccionationBlock.style';
import { trackVaccinationLink } from './utils';

const StateVaccinationBlock: React.FC<{ region: Region }> = ({ region }) => {
  const vaccinationData = getVaccinationDataByRegion(region);

  if (!vaccinationData) {
    return null;
  }

  return (
    <Fragment>
      <Header />
      <Grid container spacing={1}>
        {vaccinationData.eligibilityInfoUrl && (
          <Grid item xs={12} md={6} key="eligibility">
            <StateLinkButton
              href={vaccinationData.eligibilityInfoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackVaccinationLink(`Eligibility: ${region.fullName}`)
              }
            >
              Who is eligible
            </StateLinkButton>
          </Grid>
        )}
        {vaccinationData.vaccinationSignupUrl && (
          <Grid item xs={12} md={6} key="see-options">
            <StateLinkButton
              href={vaccinationData.vaccinationSignupUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackVaccinationLink(`Options: ${region.fullName}`)
              }
            >
              How to get vaccinated
            </StateLinkButton>
          </Grid>
        )}
      </Grid>
      <FeedbackBox />
    </Fragment>
  );
};

export default StateVaccinationBlock;
