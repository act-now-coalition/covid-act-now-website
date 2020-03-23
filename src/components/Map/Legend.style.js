import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export const LegendContainer = styled(Grid)`
  padding: 15px;
  margin: 0 10px;
`;

export const LegendItemHeader = styled(Box)`
  width: 100%;
  padding: 4px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const LegendItemContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  padding: 8px 2px;
`;

export const LegendItemDescription = styled(Box)`
  margin: 20px;
  padding: 8px 12px;
  background-color: #f7f7f7;
  border-radius: 3px;
  width: 90%;
`;

export const ColorBox = styled(Grid)`
  background-color: ${props => props.color};
  border: 1px solid gray;
  border-radius: 10px;
  margin: 0 15px 0 5px;
  height: 20px;
  width: 20px;
`;
