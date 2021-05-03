import React from 'react';
import { FilledButton, OutlinedButton } from 'components/ButtonSystem';
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
          received at least one dose of the vaccine. Find a vaccine near you and
          learn more about vaccine safety and effectiveness.
        </Body>
        <ButtonsContainer>
          <FilledButton
            href="https://www.vaccines.gov/search/"
            endIcon={<OpenInNewIcon />}
            trackingCategory={EventCategory.HOMEPAGE_BANNER}
            trackingLabel="Homepage Banner: VaccineFinder"
          >
            Find a vaccine
          </FilledButton>
          <OutlinedButton
            href="/faq#vaccines"
            trackingCategory={EventCategory.HOMEPAGE_BANNER}
            trackingLabel="Homepage Banner: Vaccine FAQs"
          >
            Vaccine FAQs
          </OutlinedButton>
        </ButtonsContainer>
      </InnerContainer>
    </BannerContainer>
  );
};

export default GetVaccinatedBanner;
