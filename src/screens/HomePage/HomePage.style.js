import styled from 'styled-components';
import { Box } from '@material-ui/core';
import palette from 'assets/theme/palette';
import { mobileBreakpoint } from 'assets/theme/sizes';
import { Subtitle1 } from 'components/Typography';

export const SearchBarThermometerWrapper = styled(Box)`
  display: flex;
  justify-content: center;

  @media (min-width: 600px) {
    margin: 0 1rem -3.5rem;
  }
`;

export const Content = styled.div`
  max-width: 1000px;
  margin: auto auto 3rem;
`;

export const PartnerSection = styled.div`
  padding: 0 1rem 1rem;
`;

export const PartnerHeader = styled(Subtitle1)`
  padding-top: 2.5rem;
  margin-top: 2.5rem;
  border-top: 1px solid ${palette.lightGray};
  text-align: center;
  margin-bottom: 1rem;
`;

export const FeaturedHeader = styled(Subtitle1)`
  margin-top: 4rem;
  text-align: center;
  margin-bottom: 1rem;
`;

export const SectionWrapper = styled(Box)`
  margin-bottom: 2.5rem;
`;

export const Section = styled(Box)`
  margin-bottom: 2.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  @media (min-width: ${mobileBreakpoint}) {
    margin-left: 0;
    margin-right: 0;
  }
`;

export const BannerContainer = styled.div`
  margin: 0 auto;

  @media (min-width: ${mobileBreakpoint}) {
    margin-top: 2rem;
    max-width: 710px;
  }
`;

export const ElectionCountdownContainer = styled.div`
  margin: 1rem auto 0;

  @media (min-width: ${mobileBreakpoint}) {
    margin-top: 2rem;
  }
`;

export const CountySwitchContainer = styled.div`
  // TODO(michael): add a margin to push the map down so the SVG doesn't overlap this div. I have to do this to get
  // pointer events to work, but I don't actually want to!
  margin-bottom: 20px;
`;
