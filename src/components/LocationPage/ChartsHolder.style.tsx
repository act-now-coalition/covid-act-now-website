import styled, { css } from 'styled-components';
import palette from 'assets/theme/palette';
import { Typography } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';
import { mobileBreakpoint } from 'assets/theme/sizes';

export const LocationPageContentWrapper = styled.div`
  @media print {
    margin-top: 0;
  }

  @media print {
    max-width: 7.5in;
    margin: 0 auto;
  }
`;

export const BelowTheFold = styled.div`
  padding: ${props => props.theme.spacingTheme.contentGutterMobile};

  @media (min-width: ${mobileBreakpoint}) {
    padding: ${props => props.theme.spacingTheme.contentGutterDesktop};
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
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 1rem;
  padding-right: 2rem;

  p {
    font-size: inherit;
  }
`;
