import styled from 'styled-components';
import { Box } from '@material-ui/core';

export const SignalStatusWrapper = styled(Box)<{
  condensed?: Boolean;
  isEmbed?: Boolean;
}>`
  ${props =>
    props.condensed
      ? `
    font-family: 'Source Code Pro', Menlo, Monaco, Consolas, 'Courier New',
      monospace;
    font-weight: bold;
    font-size: ${props.isEmbed ? '13px' : '0.875rem'};
    width: 5.5rem;
    margin-left: 1rem;
    line-height: 1.25rem;
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.25rem;
    }
  `
      : `
    border-radius: 5px;
    background-color: white;
    color: ${(props: any) => props.color || 'darkgray'};
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
      margin: 0;
      border: 1px solid #eeeeee;
    }

    svg {
      margin-right: 0.25rem;
    }
  `}
`;
