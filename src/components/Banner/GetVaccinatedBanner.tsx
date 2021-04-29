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
import { formatPercent } from 'common/utils';

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
          <strong>{percentVaccinated}</strong> of people in the U.S. have
          received at least one dose of the vaccine. Find a vaccine appointment
          and learn more about vaccine safety and effectiveness.
        </Body>
        <ButtonsContainer>
          <FilledButton
            href="https://vaccinefinder.org/"
            endIcon={<OpenInNewIcon />}
            trackingCategory={EventCategory.HOMEPAGE_BANNER}
            trackingLabel="Homepage Banner: VaccineFinder"
          >
            VaccineFinder
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
