import styled, { css } from 'styled-components';
import palette from 'assets/theme/palette';
import { Typography } from '@material-ui/core';
import { mobileBreakpoint, materialSMBreakpoint } from 'assets/theme/sizes';
import { COLOR_MAP } from 'common/colors';

export const ChartContentWrapper = styled.div`
  @media print {
    margin-top: 0;
  }

  @media print {
    max-width: 7.5in;
    margin: 0 auto;
  }
`;

export const HeaderWrapperStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 3.5rem 0 0.25rem;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: column;
  }

  @media print {
    page-break-before: always;
  }
`;

export const HeaderWrapper = styled.div`
  ${HeaderWrapperStyles};
`;

export const LocationPageSectionHeader = styled(Typography).attrs(props => ({
  component: 'h2',
}))`
  font-weight: 700;
  font-size: 1.5rem;
  max-width: 440px;
  line-height: 1.1;
  width: fit-content;

  @media (min-width: ${mobileBreakpoint}) {
    max-width: unset;
    line-height: 1;
  }
`;

export const ChartLocationNameStyles = css`
  margin-bottom: 0.625rem;
  font-weight: normal;
  font-size: 13px;
  line-height: 1.125rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.7);
  opacity: 0.7;
`;

export const ChartLocationName = styled(Typography)`
  ${ChartLocationNameStyles}
`;

export const ChartDescription = styled(Typography)`
  max-width: 600px;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 1rem;
`;

export const BetaTag = styled.div`
  font-size: 0.675rem;
  padding: 0 0.75rem;
  line-height: 1.25rem;
  margin-left: 1rem;
  border-radius: 5px;
  display: inline-block;
  background-color: ${palette.info.main};
  color: white;
  transform: translateY(-0.375rem);
`;

export const DisclaimerWrapper = styled.div`
  max-width: 600px;
  padding: 1.5rem 0 0.75rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.875rem;

  @media (min-width: ${materialSMBreakpoint}) {
    padding: 1.5rem 0 2rem;
  }

  p {
    font-size: inherit;
  }
`;
