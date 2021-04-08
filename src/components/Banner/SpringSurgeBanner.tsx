import React from 'react';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { Wrapper, InnerContainer, Body } from './SpringSurgeBanner.style';
import { scrollWithOffset } from 'components/TableOfContents';
import { HashLink } from 'react-router-hash-link';
import AggregationsJSON from 'assets/data/aggregations.json';

const trackClick = () => {
  trackEvent(
    EventCategory.HOMEPAGE_BANNER,
    EventAction.CLICK,
    'Banner: Hospitalizations explore chart',
  );
};

const BannerInner: React.FC = () => {
  const usaAggregation = AggregationsJSON['00001'];
  const { totalVaccinationsInitiated } = usaAggregation;
  const millionVaccinations = Math.round(totalVaccinationsInitiated / 1000000);

  const ManyStatesLink = (
    <HashLink
      to="#explore-hospitalizations"
      onClick={trackClick}
      scroll={(element: HTMLElement) => scrollWithOffset(element, -80)}
    >
      many states
    </HashLink>
  );

  return (
    <InnerContainer>
      <Body>
        Daily new cases are rising in half of states and hospitalizations are
        rising in {ManyStatesLink}. Help prevent another COVID wave by
        continuing to take precautions and getting vaccinated when you are
        eligible. Join the {millionVaccinations}M Americans who have already
        gotten at least one vaccine dose.
      </Body>
    </InnerContainer>
  );
};

const SummerSurgeBanner: React.FC = () => {
  return (
    <Wrapper>
      <BannerInner />
    </Wrapper>
  );
};

export default SummerSurgeBanner;
