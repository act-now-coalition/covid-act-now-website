import styled from 'styled-components';
import { Box, Typography } from '@material-ui/core';
import palette from 'assets/theme/palette';

export const SummaryStatsWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-around;
  padding: 2rem 0.5rem;
  background-color: ${palette.lightGray};
  border-radius: 0;
  box-shadow: none;
  max-width: 900px;

  @media (min-width: 600px) {
    border-radius: 2px;
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
    background-color: white;
    padding: 1.75rem;
    position: relative;
    margin: -3rem 1rem 0;
    border-radius: 5px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);
  }
  @media (min-width: 932px) {
    margin: -3rem auto 0;
  }
  @media (min-width: 1350px) {
    margin: -3rem 445px 0 auto;
  }
  @media (min-width: 1750px) {
    margin: -3rem auto 0;
  }
`;

export const SummaryStatWrapper = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 0.5rem;
  align-items: center;
`;

export const StatNameText = styled(Typography)`
  font-weight: 500;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
  flex: 1;

  @media (min-width: 600px) {
    font-size: 1.125rem;
    min-height: 0;
  }
`;

export const StatDetailText = styled(Typography)`
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 0.25rem;
`;

export const StatValueText = styled(Typography)`
  font-family: 'Source Code Pro', Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  font-size: 1.875rem;
  line-height: 3.5rem;
  margin-bottom: 0.25rem;
  text-align: center;
  font-weight: 700;
`;
