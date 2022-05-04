import styled from 'styled-components';
import { Box, Typography } from '@material-ui/core';

export const SummaryStatsWrapper = styled(Box)``;

export const SummaryStatWrapper = styled(Box)<{
  $isEmbed?: boolean;
}>`
  ${props => `
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: ${props.$isEmbed && '14px 12px'};
    margin-bottom:  ${!props.$isEmbed && '0.75rem'};

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      background-color: #fbfbfb;

      ${StatNameText} {
        color: #00bfea;
        text-decoration: underline;
      }
    }
  `}
`;

export const StatNameText = styled(Typography)<{
  $isEmbed?: boolean;
}>`
  ${props => `
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 0.875rem;
    letter-spacing: ${props.$isEmbed ? '0.04em' : '0.06em'};
    text-transform: uppercase;
    text-align: left;
    color: rgba(0, 0, 0, 0.7);
    margin-right: ${props.$isEmbed ? '.75rem' : '1rem'};
  `}
`;

export const StatTextWrapper = styled.div<{
  $isEmbed?: boolean;
}>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: left;
  flex: 1;
  margin-right: ${({ $isEmbed }) => ($isEmbed ? '.75rem' : '1.5rem')};

  @media (min-width: 600px) {
    text-align: center;
    margin-right: 0;
  }
`;

export const StatValueWrapper = styled.div`
  ${props => `
    display: flex;
    align-items: center;
  `}
`;

export const StatValueText = styled(Typography)<{
  $isEmbed?: boolean;
}>`
  font-family: 'Source Code Pro', Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  font-weight: 700;

  ${props => `
    font-size: ${props.$isEmbed ? '17px' : '1rem'};
    line-height: 1rem;
    text-align: right;
  `}
`;
