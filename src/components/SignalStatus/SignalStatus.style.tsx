import styled from 'styled-components';
import { Box } from '@material-ui/core';

export const SignalStatusWrapper = styled(Box)`
  padding: 0 0.4rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-color: white;
  color: ${props => props.color || 'darkgray'};
  display: inline-block;
  font-family: 'Source Code Pro', Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  font-style: normal;
  font-weight: bold;
  font-size: 0.8rem;
  line-height: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 600px) {
    min-width: 120px;
  }

  svg {
    margin-right: 0.25rem;
  }
`;
