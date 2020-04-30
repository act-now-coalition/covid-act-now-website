import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { colors, Typography } from '@material-ui/core';

export const CondensedCaption = styled(Typography)`
  color: ${colors.grey[600]};
  font-weight: 400;
`;

export const CondensedLegendItemText = styled(Typography)`
  font-weight: 900;
  color: ${colors.grey[50]};
  text-shadow: rgba(0, 0, 0, 0.75) 0.5px 0.5px 2px;
`;

export const LegendContainer = styled.div`
  display: inline-flex;
`;

export const LegendItemHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.7);
`;

export const LegendItemContainer = styled.div`
  display: flex;
  margin-right: 1.5rem;

  &:last-child {
    margin-right: 0;
  }

  @media (min-width: 960px) {
    margin: 0.5rem;
  }
`;

export const ColorBox = styled(Grid)`
  background-color: ${props => props.color};
  margin-right: 8px;
  border-radius: 100%;
  height: 14px;
  width: 14px;
`;

export const LegendWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;

  @media (min-width: 600px) {
    flex-direction: row;
    margin-top: -1rem;
  }
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
