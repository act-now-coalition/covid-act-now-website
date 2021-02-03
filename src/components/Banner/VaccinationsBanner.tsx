import React, { Fragment } from 'react';
import { HashLink } from 'react-router-hash-link';
import { ButtonContainer } from './Banner.style';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';
import {
  Wrapper,
  InnerContainer,
  Header,
  Body,
  SearchButton,
  CompareButton,
} from './VaccinationsBanner.style';
import AggregationsJSON from 'assets/data/aggregations.json';
import { formatEstimate } from 'common/utils';
import { scrollWithOffset } from 'components/TableOfContents';

const Buttons: React.FC = () => {
  return (
    <Fragment>
      <HashLink
        to="#compare"
        scroll={(element: HTMLElement) => scrollWithOffset(element, -80)}
      >
        <CompareButton
          onClick={() => {
            trackEvent(
              EventCategory.VACCINATION,
              EventAction.CLICK,
              'Banner: Compare states',
            );
          }}
        >
          Compare states
        </CompareButton>
      </HashLink>
      <HashLink
        to="#search"
        scroll={(element: HTMLElement) => scrollWithOffset(element, -80)}
      >
        <SearchButton
          onClick={() => {
            trackEvent(
              EventCategory.VACCINATION,
              EventAction.CLICK,
              'Banner: See my state',
            );
          }}
        >
          See my state
        </SearchButton>
      </HashLink>
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
        The CDC reports that {formatEstimate(totalVaccinationsInitiated, 5)}{' '}
        Americans have received their first shot.
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
