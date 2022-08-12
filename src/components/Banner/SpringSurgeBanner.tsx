import React from 'react';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { Wrapper, InnerContainer, Body } from './SpringSurgeBanner.style';
import { scrollWithOffset } from 'components/TableOfContents';
import { HashLink } from 'react-router-hash-link';
import SiteSummaryJSON from 'assets/data/site-summary.json';

const trackClick = () => {
  trackEvent(
    EventCategory.HOMEPAGE_BANNER,
    EventAction.CLICK,
    'Banner: Hospitalizations explore chart',
  );
};

const BannerInner: React.FC = () => {
  const { totalVaccinationsInitiated } = SiteSummaryJSON.usa;
  // HACK: millionVaccinations should never be null but TS complains.
  const millionVaccinations = totalVaccinationsInitiated
    ? Math.round(totalVaccinationsInitiated / 1000000)
    : 0;

  const HospitalizationsAreRisingTooLink = (
    <HashLink
      to="#explore-hospitalizations"
      onClick={trackClick}
      scroll={(element: HTMLElement) => scrollWithOffset(element, -80)}
    >
      hospitalizations are rising too
    </HashLink>
  );

  return (
    <InnerContainer>
      <Body>
        Daily new cases are rising in half of the states and{' '}
        {HospitalizationsAreRisingTooLink}. Continue to take precautions and
        join the {millionVaccinations}M Americans who have already gotten a
        vaccine dose.
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
