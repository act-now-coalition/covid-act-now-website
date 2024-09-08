import React from 'react';
import {
  BannerContainer,
  LocationBannerContainer,
  InnerContainer,
  Body,
} from './HiatusBanner.style';

export interface HiatusBannerProps {
  type?: 'location' | 'homepage';
}

export const HiatusBanner = ({ type = 'homepage' }: HiatusBannerProps) => {
  const Container =
    type === 'location' ? LocationBannerContainer : BannerContainer;

  return (
    <Container>
      <InnerContainer>
        <Body>
          <strong>
            We are entering hibernation mode until at least November 15, 2024
            due to lack of available data.
          </strong>{' '}
          <span>
            We are cautiously optimistic that the{' '}
            <a href="https://www.cdc.gov/ncird/whats-new/updated-hospital-reporting-requirements-for-respiratory-viruses.html">
              new federal hospital data reporting requirements
            </a>{' '}
            starting in November 2024 will enable us to provide timely,
            actionable updates.
          </span>
          {/* This is ugly, but I want the span text style, not the <p> style */}
          <br /> <br />
          <span>
            In the meantime, the site will remain available for historical
            reference. For the latest information, we recommend checking your
            local health department’s website for wastewater surveillance data.
          </span>
        </Body>
      </InnerContainer>
    </Container>
  );
};
