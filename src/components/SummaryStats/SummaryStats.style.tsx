import styled from 'styled-components';
import { Box, Typography } from '@material-ui/core';
import palette from 'assets/theme/palette';
import { COLOR_MAP } from 'common/colors';

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
    padding: 2rem 0.5rem;
    background-color: ${palette.lightGray};
    border-radius: 0;
    box-shadow: none;
    max-width: 900px;
    flex-direction: column;
    cursor: pointer;

    @media (min-width: 600px) {
      flex-direction: row;
      border-radius: 2px;
      box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
      background-color: white;
      padding: 1.75rem 1em;
      position: relative;
      margin: -3rem 1rem 0;
      border-radius: 5px;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);
    }
    @media (min-width: 932px) {
      margin: -3rem auto 0;
    }
    @media (min-width: 1350px) {
      margin: -3rem 445px 0 auto;
    }
    @media (min-width: 1750px) {
      margin: -3rem auto 0;
    }
  `}
`;

export const SummaryStatWrapper = styled(Box)<{ condensed?: Boolean }>`
  ${props =>
    props.condensed
      ? `
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 14px 17px;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      background-color: ${COLOR_MAP.GRAY.LIGHT};
    }
  `
      : `
    display: flex;
    flex: 1;
    flex-direction: row;
    margin: 0 0.5rem;
    padding: 1.5rem 0;
    align-items: stretch;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }

    @media (min-width: 600px) {
      border-bottom: 0;
      margin: 0;
      padding: 0 1.2rem 0 1rem;
      flex-direction: column;
      align-items: center;

      &:not(:last-child) {
        border-right: 1px solid ${palette.divider};
      }

      &:last-child{
        padding-right: 0;
      }
    }
  `}
`;

export const StatNameText = styled(Typography)<{ condensed?: Boolean }>`
  ${props =>
    props.condensed
      ? `
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 0.875rem;;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-align: left;
    color: rgba(0, 0, 0, 0.7);
    margin-right: 1rem;
  `
      : `
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 1.25rem;

    @media (min-width: 600px) {
      min-height: 0;
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
  font-size: 0.875rem;
  line-height: 1.125rem;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 0.25rem;
`;

export const StatValueText = styled(Typography)<{ condensed?: Boolean }>`
  font-family: 'Source Code Pro', Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  font-weight: 700;

  ${props =>
    props.condensed
      ? `
    font-size: 1rem;
    line-height: 1rem;
    text-align: right;
  `
      : `
    font-size: 1.5rem;
    line-height: 1.125rem;
    margin-bottom: 0.5rem;

    @media (min-width: 600px) {
      text-align: left;
      font-size: 1.875rem;
      line-height: 3.5rem;
    }
  `}
`;

export const BetaTag = styled.span`
  margin-left: 1rem;
  border-radius: 5px;
  display: inline-block;
  background-color: ${palette.info.main};
  color: white;
  font-size: 0.675rem;
  padding: 0 0.75rem;
  transform: translateY(-0.45rem);
  line-height: 1.25rem;
`;
