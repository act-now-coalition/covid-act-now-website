import styled from 'styled-components';
import { Box } from '@material-ui/core';
import palette from 'assets/theme/palette';

export const SummaryStatsWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  background-color: ${palette.lightGray};
  border-radius: 0;
  box-shadow: none;

  @media (min-width: 600px) {
    border-radius: 2px;
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
    background-color: white;
    margin: 0 auto;
    padding: 1rem 2rem;
    position: relative;
    top: -3rem;
    border-radius: 2px;
    /* Material UI equivalent: boxShadow="2" */
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px,
      rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  }
  @media (min-width: 900px) {
    width: 800px;
  }
  @media (min-width: 1350px) {
    margin: 0 445px 0 auto;
  }
  @media (min-width: 1750px) {
    margin: 0 auto;
  }
`;

export const SummaryHolder = styled.div`
  display: flex;
  justify-content: center;
`;
