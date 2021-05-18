import styled from 'styled-components';
import { Box } from '@material-ui/core';
import palette from 'assets/theme/palette';
import { Subtitle1 } from 'components/Typography';
import { mobileBreakpoint, materialSMBreakpoint } from 'assets/theme/sizes';

export const ColumnCentered = styled.div<{ $topBottomSpacing?: boolean }>`
  display: flex;
  margin: ${({ $topBottomSpacing }) =>
    $topBottomSpacing ? '1rem auto' : 'auto'};
  flex-direction: column;
`;

export const Content = styled.div`
  max-width: 1000px;
  margin: auto auto 3rem;
`;

export const SectionWrapper = styled.div`
  margin-bottom: 2.5rem;
`;

export const Section = styled.div`
  margin: 3.5rem 1rem;
  @media (min-width: ${mobileBreakpoint}) {
    margin: 3.5rem 0;
  }
`;

// zero right margin so that it's full bleed on mobile when overflowing
export const RegionItemsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  margin-top: 0.75rem;
  margin-bottom: 2.25rem;
  margin-left: 1rem;
  margin-right: 0;
  flex: 1;
  overflow-x: auto;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
    margin: auto;
    margin-top: 0.75rem;
  }
`;

export const SearchBarThermometerWrapper = styled(Box)`
  display: flex;
  justify-content: center;

  @media (min-width: 600px) {
    margin: 0 1rem -3.5rem;
  }
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
