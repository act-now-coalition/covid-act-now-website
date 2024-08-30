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
          <strong>We've entered hibernation mode</strong>{' '}
          <span>
            due to a lack of up-to-date data. The data displayed should not be
            considered for current, actionable decisions. Federal reporting may
            resume in October, 2024, at which point we may resume data updates.
          </span>
          {/* This is ugly, but I want the span text style, not the <p> style */}
          <br /> <br />
          <span>
            In the meantime, you can{' '}
            <a href="https://www.house.gov/representatives/find-your-representative">
              contact your representatives
            </a>{' '}
            to advocate for better data reporting and continue to follow your
            local health department's guidance.
          </span>
        </Body>
      </InnerContainer>
    </Container>
  );
};
