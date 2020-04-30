import styled from 'styled-components';
import palette from 'assets/theme/palette';
import { Typography } from '@material-ui/core';

export const ChartContentWrapper = styled.div`
  margin-top: 85px;
  @media (min-width: 1350px) {
    margin-top: 97px;
  }
`;

export const MainContentInner = styled.div`
  margin: 0 1rem;

  @media (min-width: 932px) {
    max-width: 900px;
    margin: 0 auto;
  }

  @media (min-width: 1350px) {
    margin: 0 445px 0 auto;
  }

  @media (min-width: 1750px) {
    margin: 0 auto;
  }
`;

export const ChartHeader = styled.div`
  margin: 4.875rem 0 0.25rem;
  font-weight: 700;
  font-size: 1.5rem;
`;

export const ChartLocationName = styled(Typography)`
  margin-bottom: 0.625rem;
  font-weight: normal;
  font-size: 0.875rem;
  line-height: 1.125rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.7);
  opacity: 0.7;
`;

export const ChartDescription = styled(Typography)`
  max-width: 600px;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 1rem;
`;

export const BetaTag = styled.span`
  font-size: 0.75rem;
  margin-left: 1rem;
  border-radius: 5px;
  display: inline-block;
  background-color: ${palette.info.main};
  color: white;
  padding: 0 0.75rem;
  transform: translateY(-0.25rem);
`;
