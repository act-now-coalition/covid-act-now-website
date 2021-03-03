import styled, { css } from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

export const LegendContainer = styled.div<{
  $condensed: boolean;
}>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: ${props => (props.$condensed ? 'unset' : '3.5rem')};
  width: 100%;

  @media (min-width: 960px) {
    height: unset;
    width: unset;
    flex-direction: ${props => (props.$condensed ? 'column' : 'row')};
  }
`;

export const LegendItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.7);
`;

export const LegendItemContainer = styled.div<{
  $condensed: boolean;
}>`
  display: flex;
  flex: 0 1 auto;
  ${props =>
    props.$condensed
      ? `
    margin: 0;
    padding: 0;
  `
      : `
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }

    @media (min-width: 960px) {
      margin: 0.5rem;
    }
  `}
`;

export const ColorBox = styled(Grid)`
  background-color: ${props => props.color};
  margin-right: 8px;
  border-radius: 100%;
  height: 12px;
  width: 12px;
`;

export const LegendWrapper = styled.div<{
  $condensed: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
  align-items: ${props => (props.$condensed ? 'flex-start' : 'center')};
  padding: ${props => (props.$condensed ? '0.75rem 0 0' : '0 0.5rem')};
  ${props =>
    !props.$condensed &&
    css<{
      $condensed: boolean;
    }>`
      @media (min-width: 600px) {
        flex-direction: row;
        margin-top: 2rem;
        padding: ${props => (props.$condensed ? '0.75rem 0 0' : '0 1rem')};
      }
    `};
`;

export const LegendTitle = styled(Typography)`
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  line-height: 1.5;

  @media (min-width: 600px) {
    margin-right: 1.5rem;
    margin-bottom: 0;
  }
`;
