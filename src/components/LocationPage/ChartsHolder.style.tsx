import styled from 'styled-components';
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
  margin: 4.875rem 0 0.5rem;
  font-weight: 700;
  font-size: 1.5rem;
`;

export const ChartLocationName = styled(Typography)`
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 0.625rem;
`;

export const ChartDescription = styled(Typography)`
  max-width: 600px;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 1rem;
`;
