import styled from 'styled-components';
import { Box } from '@material-ui/core';

export const SignalStatusWrapper = styled(Box)`
  max-width: 150px;
  min-width: 120px;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-color: white;
  color: ${props => props.color || 'darkgray'};
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  font-style: normal;
  font-weight: bold;
  font-size: 0.8rem;
  line-height: 1.6rem;
  text-align: center;
`;
