import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
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

export const LegendContainer = styled(Grid)``;

export const LegendItemHeader = styled(Box)`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 13px;
`;

export const LegendItemContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.color || 'none'};
  margin: 0.5rem 1rem;
  @media (min-width: 960px) {
    margin: 0.5rem;
  }
`;

export const LegendItemDescription = styled(Box)`
  padding: 8px;
  background-color: #f7f7f7;
  border-radius: 3px;
  width: 100%;
`;

export const ColorBox = styled(Grid)`
  background-color: ${props => props.color};
  margin-right: 8px;
  border-radius: 100%;
  height: 14px;
  width: 14px;
`;
