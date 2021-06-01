import styled from 'styled-components';
import { Box } from '@material-ui/core';
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

export const Section = styled.div`
  margin: 3.5rem 1rem;
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

export const SectionWrapper = styled.div`
  max-width: 1000px;
  margin: auto 1rem;
  padding: 2.5rem 0;
  border-top: 1px solid ${props => props.theme.palette.lightGray};
`;

export const SectionHeader = styled(Subtitle1)`
  text-align: center;
  margin-bottom: 1.25rem;
`;
