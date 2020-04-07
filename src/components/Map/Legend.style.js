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

export const LegendContainer = styled(Grid)`
  padding: ${props => (props.condensed ? '0.1rem 1rem' : '1rem')};
`;

export const LegendItemHeader = styled(Box)`
  width: 100%;
  padding: 4px ${props => (props.condensed ? '8px' : '20px')};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const LegendItemContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3px 5px;
  padding: 4px 2px;
  background-color: ${props => props.color || 'none'};
`;

export const LegendItemDescription = styled(Box)`
  margin: 8px;
  padding: 8px;
  background-color: #f7f7f7;
  border-radius: 3px;
  width: 90%;
`;

export const ColorBox = styled(Grid)`
  background-color: ${props => props.color};
  border: 1px solid gray;
  border-radius: 10px;
  margin: 2px 10px 0 0;
  height: 20px;
  width: 20px;
`;
