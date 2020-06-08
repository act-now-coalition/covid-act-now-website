import styled from 'styled-components';
import { Box, Typography } from '@material-ui/core';
import palette from 'assets/theme/palette';

export const SummaryStatsWrapper = styled(Box)<{ condensed?: Boolean }>`
  ${props =>
    props.condensed
      ? `
    display: block;
  `
      : `
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    background-color: white;
    border-radius: 0;
    box-shadow: none;
    max-width: 900px;
    flex-direction: column;
    cursor: pointer;

    @media (min-width: 600px) {
      background-color: ${palette.lightGray};

      flex-direction: row;
      background-color: white;
      position: relative;
    }
  `}
`;

export const SummaryStatWrapper = styled(Box)<{
  condensed?: Boolean;
  isEmbed?: Boolean;
}>`
  ${props =>
    props.condensed
      ? `
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: ${props.isEmbed && '15px 16px'};
    margin-bottom:  ${!props.isEmbed && '0.75rem'};

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
  `
      : `
    display: flex;
    flex: 1;
    flex-direction: row;
    padding: 1.85rem 1rem;
    align-items: stretch;
    border-bottom: 1px solid ${palette.lightGray};

    &:first-child {
      border-top: 1px solid ${palette.lightGray};
    }

    @media (min-width: 600px) {
      border-bottom: 1px solid ${palette.lightGray};
      border-top: 1px solid ${palette.lightGray};
      margin: 0;
      padding: 1.5rem 1.25rem;
      flex-direction: column;
      align-items: center;
      max-width: 25%;

      &:not(:last-child) {
        border-right: 1px solid ${palette.divider};
      }
    }
  `}
`;

export const StatNameText = styled(Typography)<{
  condensed?: Boolean;
  isEmbed?: Boolean;
}>`
  ${props =>
    props.condensed
      ? `
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 0.875rem;
    letter-spacing: ${props.isEmbed ? '0.04em' : '0.06em'};
    text-transform: uppercase;
    text-align: left;
    color: rgba(0, 0, 0, 0.7);
    margin-right: 1rem;
  `
      : `
    font-weight: 600;
    line-height: 1.25rem;

    text-transform: uppercase;
    font-size: 14px;
    line-height: 1.4;

    @media (min-width: 600px) {
      min-height: 0;
      font-size: 1rem;
    }
  `}
`;

export const StatTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  flex: 1;
  margin-right: 1.5rem;

  @media (min-width: 600px) {
    text-align: center;
    margin-right: 0;
  }
`;
export const StatValueWrapper = styled.div<{ condensed?: Boolean }>`
  ${props =>
    props.condensed
      ? `
    display: flex;
    align-items: center;
  `
      : `
    display: flex;
    flex-direction: column;
    text-align: right;
    align-items: flex-end;
    justify-content: center;

    @media (min-width: 600px) {
      align-items: center;
      text-align: left;
    }
  `}
`;

export const StatDetailText = styled(Typography)`
  color: rgba(0, 0, 0, 0.7);
  margin-top: 0.35rem;
  font-family: 'Source Code Pro';
  font-size: 12px;
  line-height: 1.4;

  @media (min-width: 600px) {
    margin-top: 0.25rem;
    font-size: 0.8rem;
    line-height: 1.125rem;
  }
`;

export const StatValueText = styled(Typography)<{
  condensed?: Boolean;
  isEmbed?: Boolean;
}>`
  font-family: 'Source Code Pro', Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  font-weight: 700;

  ${props =>
    props.condensed
      ? `
    font-size: ${props.isEmbed ? '17px' : '1rem'};
    line-height: 1rem;
    text-align: right;
  `
      : `
    font-size: 1.5rem;
    line-height: 1.125rem;
    margin-bottom: 0.35rem;

    @media (min-width: 600px) {
      text-align: left;
      font-size: 1.875rem;
      line-height: 3.5rem;
      margin-bottom: 0.5rem;
    }
  `}
`;

export const BetaTag = styled.span<{ isHeader?: Boolean }>`
  margin-left: ${({ isHeader }) => (isHeader ? '.8rem' : '1rem')};
  border-radius: 5px;
  display: inline-block;
  background-color: ${palette.info.main};
  color: white;
  font-size: 0.675rem;
  padding: 0 0.75rem;
  transform: translateY(-0.15rem);
  line-height: 1.35rem;

  @media (min-width: 600px) {
    transform: translateY(-0.45rem);
  }
`;
