import { StateVaccineData, useStateVaccineData } from 'cms-content/vaccines';
import { getStateName, Region } from 'common/regions';
import { Subtitle1 } from 'components/Typography';
import { HeaderCopy, BorderedContainer } from './VaccineDetails.style';
import React from 'react';
import ExternalLink from 'components/ExternalLink';
import { Grid } from '@material-ui/core';
import { assert } from 'common/utils';

interface VaccineDetailsProps {
  data?: StateVaccineData;
  locationName: string;
}

export const VaccineDetailsContent = ({
  data,
  locationName,
}: VaccineDetailsProps) => {
  return (
    <div>
      <div>
        <HeaderCopy>How can I get vaccinated</HeaderCopy>
        <Subtitle1>in {locationName}</Subtitle1>
      </div>
      {data && (
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
      )}
      <div>
        <p>
          Help us improve by recommending new resources for vaccine eligibility
          and how to sign up in your area.
        </p>
      </div>
    </div>
  );
};

const VaccineDetailsWrapper = ({ region }: { region: Region }) => {
  // TODO(chris): Probably don't need state name, maybe just region name.
  const stateName = getStateName(region);
  assert(stateName);
  const vaccineInfo = useStateVaccineData(region);

  return <VaccineDetailsContent data={vaccineInfo} locationName={stateName} />;
};

export default VaccineDetailsWrapper;
