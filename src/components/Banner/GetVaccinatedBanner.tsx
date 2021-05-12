import React from 'react';
import { FilledButton } from 'components/ButtonSystem';
import { EventCategory } from 'components/Analytics';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {
  BannerContainer,
  InnerContainer,
  Body,
  ButtonsContainer,
} from './GetVaccinatedBanner.style';
import AggregationsJSON from 'assets/data/aggregations.json';
import { formatPercent, formatInteger } from 'common/utils';

const GetVaccinatedBanner: React.FC = () => {
  const usaAggregation = AggregationsJSON['00001'];
  const { totalVaccinationsInitiated, totalPopulation } = usaAggregation;
  const percentVaccinated = formatPercent(
    totalVaccinationsInitiated / totalPopulation,
  );

  return (
    <BannerContainer>
      <InnerContainer>
        <Body>
          <strong>{formatInteger(totalVaccinationsInitiated)}</strong> people (
          <strong>{percentVaccinated}</strong> of the U.S. population) have
          received at least one dose of the vaccine.
        </Body>
        <ButtonsContainer>
          <FilledButton
            href="https://www.cdc.gov/coronavirus/2019-ncov/vaccines/talk-about-vaccines.html"
            endIcon={<OpenInNewIcon />}
            trackingCategory={EventCategory.HOMEPAGE_BANNER}
            trackingLabel="Homepage Banner: CDC Talk About Vaccines"
          >
            How to talk with friends and family about getting vaccinated
          </FilledButton>
        </ButtonsContainer>
      </InnerContainer>
    </BannerContainer>
  );
};

export default GetVaccinatedBanner;
