import styled from 'styled-components';
import { Button, Box } from '@material-ui/core';

export const AnomalyButton = styled(Button)<{ anyNewAnomalies: boolean }>`
  min-width: fit-content;
  cursor: pointer;
  background: ${props => (props.anyNewAnomalies ? 'yellow' : 'white')};
  font-weight: 500;
  box-shadow: none;
  text-transform: none;
  display: inline-block;
`;

export const AnomalyModalWrapper = styled(Box)({
  position: 'absolute' as 'absolute',
  minWidth: '400px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: 20,
  backgroundColor: 'white',
  borderRadius: 5,
});
