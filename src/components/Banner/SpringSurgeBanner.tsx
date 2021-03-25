import React from 'react';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { Wrapper, InnerContainer, Body } from './SpringSurgeBanner.style';
import { scrollWithOffset } from 'components/TableOfContents';
import { HashLink } from 'react-router-hash-link';

const trackClick = () => {
  trackEvent(
    EventCategory.HOMEPAGE_BANNER,
    EventAction.CLICK,
    'Banner: Hospitalizations explore chart',
  );
};

const VaccinationsBannerInner: React.FC = () => {
  const SeveralStatesLink = (
    <HashLink
      to="#explore-hospitalizations"
      onClick={trackClick}
      scroll={(element: HTMLElement) => scrollWithOffset(element, -80)}
    >
      several states
    </HashLink>
  );
  return (
    <InnerContainer>
      <Body>
        Hospitalizations are rising in {SeveralStatesLink}. Help prevent another
        COVID wave by continuing to take precautions and getting vaccinated when
        you are eligible.
      </Body>
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
