import React, { Fragment } from 'react';
import { ButtonContainer } from './Banner.style';
import { EventAction, EventCategory } from 'components/Analytics';
import {
  Wrapper,
  InnerContainer,
  Header,
  Body,
  SearchButton,
  CompareButton,
} from './VaccinationsBanner.style';
import { formatEstimate } from 'common/utils';
import { useAggregations } from 'common/hooks';
import { scrollWithOffset } from 'components/TableOfContents';

const Buttons: React.FC = () => {
  return (
    <Fragment>
      <CompareButton
        to="#compare"
        scroll={(element: HTMLElement) => scrollWithOffset(element, -80)}
        trackingCategory={EventCategory.VACCINATION}
        trackingAction={EventAction.CLICK}
        trackingLabel="Banner: Compare states"
      >
        Compare states
      </CompareButton>
      <SearchButton
        to="#search"
        scroll={(element: HTMLElement) => scrollWithOffset(element, -80)}
        trackingCategory={EventCategory.VACCINATION}
        trackingAction={EventAction.CLICK}
        trackingLabel="Banner: See my state"
      >
        See my state
      </SearchButton>
    </Fragment>
  );
};

const VaccinationsBannerInner: React.FC = () => {
  const { result: aggregations, pending } = useAggregations();

  if (pending || !aggregations) {
    return <InnerContainer>Loading...</InnerContainer>;
  }

  const usaAggregation = aggregations['00001'];
  const { totalVaccinationsInitiated } = usaAggregation;

  return (
    <InnerContainer>
      <Header>New vaccine data</Header>
      <Body>
        The CDC reports that {formatEstimate(totalVaccinationsInitiated, 5)}{' '}
        Americans have received at least one dose.
      </Body>
      <ButtonContainer>
        <Buttons />
      </ButtonContainer>
    </InnerContainer>
  );
};

const VaccinationsBanner: React.FC = () => {
  return (
    <Wrapper>
      <VaccinationsBannerInner />
    </Wrapper>
  );
};

export default VaccinationsBanner;
