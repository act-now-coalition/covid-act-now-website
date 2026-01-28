import React from 'react';
import {
  BannerContainer,
  LocationBannerContainer,
  InnerContainer,
  Body,
} from './HiatusBanner.style';
import ExternalLink from 'components/ExternalLink';

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
          This page is no longer being updated due to limited data availability.
          While we continue to surface this content for archival purposes, we
          recommend that you visit more regularly updated resources, such as
          from the{' '}
          <ExternalLink href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">
            CDC
          </ExternalLink>
          .
        </Body>
      </InnerContainer>
    </Container>
  );
};
