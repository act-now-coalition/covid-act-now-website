import React, { Fragment } from 'react';
import { ButtonContainer } from './Banner.style';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';
import {
  Wrapper,
  Button,
  InnerContainer,
  Header,
  Body,
  IconWrapper,
  Icon,
} from './VaccinationsBanner.style';
import AggregationsJSON from 'assets/data/aggregations.json';
import vaccinationsIcon from 'assets/images/misc/vaccination_icon.svg';
import { formatInteger } from 'common/utils';

const Buttons: React.FC = () => {
  return (
    <Fragment>
      <Button
        onClick={() => {
          trackEvent(
            EventCategory.VACCINATION,
            EventAction.CLICK,
            'Banner: Compare states',
          );
          window.location.href = '#compare';
        }}
      >
        Compare states
      </Button>
      <Button
        onClick={() => {
          trackEvent(
            EventCategory.VACCINATION,
            EventAction.CLICK,
            'Banner: Learn more',
          );
          window.location.href = '#search';
        }}
      >
        See my state
      </Button>
    </Fragment>
  );
};

const VaccinationsBannerInner: React.FC = () => {
  const usaAggregation = AggregationsJSON['00001'];
  const { totalVaccinationsInitiated } = usaAggregation;

  return (
    <InnerContainer>
      <Header>New vaccine data</Header>
      <Body>
        See how many people are vaccinated in each state. The CDC reports that{' '}
        {formatInteger(totalVaccinationsInitiated)} Americans have received
        their first shot.
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
      <IconWrapper>
        <Icon src={vaccinationsIcon} />
      </IconWrapper>
      <VaccinationsBannerInner />
    </Wrapper>
  );
};

export default VaccinationsBanner;
