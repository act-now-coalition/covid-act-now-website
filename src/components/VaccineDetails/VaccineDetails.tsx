import { StateVaccineData } from 'cms-content/vaccines';
import { getStateName, Region } from 'common/regions';
import { Subtitle1 } from 'components/Typography';
import { HeaderCopy, BorderedContainer } from './VaccineDetails.style';
import React from 'react';
import ExternalLink from 'components/ExternalLink';
import { Grid } from '@material-ui/core';

interface VaccineDetailsProps {
  data: StateVaccineData;
  region: Region;
}

const VaccineDetails = ({ data, region }: VaccineDetailsProps) => {
  // TODO(chris): Probably don't need state name, maybe just region name.
  const stateName = getStateName(region);
  return (
    <div>
      <div>
        <HeaderCopy>How can I get vaccinated</HeaderCopy>
        <Subtitle1>in {stateName}</Subtitle1>
      </div>
      <BorderedContainer>
        <Grid item xs={12}>
          <p>Here are the best resources we've found to:</p>
        </Grid>
        <Grid item xs={12}>
          <ExternalLink href={data.generalInformationUrl}>
            Find out about your eligibility
          </ExternalLink>
        </Grid>
        <Grid item xs={12}>
          <ExternalLink href={data.howToGetVaccinatedUrl}>
            Sign up for the COVID-19 vaccine
          </ExternalLink>
        </Grid>
      </BorderedContainer>
      <div>
        <p>
          Help us improve by recommending new resources for vaccine eligibility
          and how to sign up in your area.
        </p>
      </div>
    </div>
  );
};

export default VaccineDetails;
