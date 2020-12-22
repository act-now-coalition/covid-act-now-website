import styled from 'styled-components';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import palette from 'assets/theme/palette';

export const Container = styled(Box)`
  line-height: 1.4;
  margin: 1.5rem 1rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin: 2.5rem 0.875rem 2.5rem 2.25rem;
  }
`;

export const HeaderTitle = styled(Typography).attrs(props => ({
  component: 'h1',
}))<{ $isEmbed?: boolean }>`
  color: ${palette.black};
  font-size: ${({ $isEmbed }) => ($isEmbed ? '1.8rem' : '22px')};
  font-weight: normal;
  line-height: ${({ $isEmbed }) => ($isEmbed ? '1.5rem' : '2.2rem')};
  padding: 0;
  text-align: center;

  @media (min-width: ${materialSMBreakpoint}) {
    font-size: 30px;
    text-align: left;
  }
`;

export const HeaderSubtitle = styled(Typography).attrs(props => ({
  component: 'span',
}))`
  display: block;
  text-align: center;
  font-weight: 500;

  @media (min-width: ${materialSMBreakpoint}) {
    text-align: left;
  }
`;

export const HeaderStateCode = styled.span`
  a {
    color: ${palette.black};
    text-decoration: none;
  }
`;
