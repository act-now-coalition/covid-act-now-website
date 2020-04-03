import styled, { createGlobalStyle } from 'styled-components';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { COLORS } from 'enums';

// EMBED GLOBAL STYLES
export const EmbedGlobalStyle = createGlobalStyle`
  body {
    background: none transparent;
  }
`;

export const EmbedHeaderContainer = styled(Box)`
  background-color: ${COLORS.LIGHTGRAY};
`;

export const EmbedContainer = styled(Paper)`
  margin: 3px;
  overflow: hidden;
  border-radius: 3px;
  max-height: 600px;
  overflow-y: scroll;
`;

// DATA PAGE STYLES
export const PaddedGridItem = styled(Grid)`
  display: flex;
  flex-grow: 0.5;
  justify-content: center;
  align-items: center;
  padding: ${props => (props.flexGrow ? '1.2rem 0' : props.p || '1.2rem 2rem')};
  border-top: ${props => (props.bt ? '1px solid lightgray' : 'none')};
  border-bottom: ${props => (props.bb ? '1px solid lightgray' : 'none')};
  border-right: ${props => (props.br ? '1px solid lightgray' : 'none')};
`;

export const H1Statistic = styled(Box)`
  font-weight: 800;
  font-size: 1.6rem;
  margin-bottom: ${props => props.mb || 'none'};
`;
export const H2Statistic = styled(Box)`
  font-size: 1rem;
  font-weight: 800;
  margin-bottom: 0.2rem;
`;
export const H3Statistic = styled(Box)`
  font-size: 0.8rem;
  font-weight: 800;
`;

export const H4Statistic = styled.span`
  color: #808080;
  font-size: 0.7rem;
  font-weight: 500;
`;

export const H4StatisticLight = styled(H4Statistic)`
  font-weight: 400;
`;

export const Spacer = styled(Box)`
  width: 6rem;
  border-top: 1px solid lightgray;
  margin: 0 auto;
`;

// CHART STYLE
export const EmbedChartContainer = styled(Box)`
  padding: 0.5rem 0;
`;

// FOOTER STYLES
export const FooterContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  background-color: ${COLORS.LIGHTGRAY};
  width: 100%;
`;

export const FooterButtonContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  padding: 0.3rem;
  justify-content: center;
  width: 100%;
`;

export const FooterButton = styled(Button)`
  text-transform: none;
  min-width: 9rem;
  color: #00d07d;
  :not(:last-child) {
    margin-right: 1rem;
  }
`;
export const FooterSignature = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  padding: 0.5rem;
  text-align: center;
  & > a:link,
  a:visited {
    color: #00d07d;
  }
`;
export const FooterLogoWrapper = styled(Box)`
  max-width: 0.5rem;
  padding-top: 7px;
  padding-right: 70px;
`;
