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

const BannerInner: React.FC = () => {
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
        Daily new cases are flat or rising in two-thirds of states and
        hospitalizations are rising in {SeveralStatesLink}. Help prevent another
        COVID wave by continuing to take precautions and getting vaccinated when
        you are eligible.
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
