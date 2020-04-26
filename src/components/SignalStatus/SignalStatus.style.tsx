import styled from 'styled-components';
import { Paper } from '@material-ui/core';

export const SignalStatusWrapper = styled(Paper)`
  color: ${props => props.color};
  font-size: 13px;
  font-weight: bold;
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
  monospace;
  padding: 0 2px;
`;
