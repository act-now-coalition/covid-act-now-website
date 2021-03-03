import styled, { createGlobalStyle } from 'styled-components';
import { Box, Grid, Typography, Paper, Button } from '@material-ui/core';
import { COLORS } from 'common';
import { EMBED_WIDTH, EMBED_HEIGHT } from './EmbedEnums';
import {
  PreviewFooterStyles,
  PreviewHeaderStyles,
} from 'components/SocialLocationPreview/SocialLocationPreview.style';

// EMBED GLOBAL STYLES
export const EmbedGlobalStyle = createGlobalStyle`
  body {
    background: none transparent;
  }
`;

export const EmbedHeaderContainer = styled(Box)`
  background-color: ${COLORS.LIGHTGRAY};
`;

export const EmbedContainer = styled(Paper)<{
  height?: number;
  width?: number;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  border-radius: 4px;
  height: ${props => props.height || `${EMBED_HEIGHT}px`};
  width: ${props => props.width || `${EMBED_WIDTH}px`};
  box-shadow: none;
`;

export const EmbedContentContainer = styled(Box)`
  flex: 1;
`;

// DATA PAGE STYLES
export const PaddedGridItem = styled(Grid)<{
  flexGrow?: number;
  p?: string;
  bt?: boolean;
  bb?: boolean;
  br?: boolean;
}>`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding: ${props => (props.flexGrow ? '0.6rem 0' : props.p || '0.5rem 2rem')};
  border-top: ${props => (props.bt ? '1px solid lightgray' : 'none')};
  border-bottom: ${props => (props.bb ? '1px solid lightgray' : 'none')};
  border-right: ${props => (props.br ? '1px solid lightgray' : 'none')};
`;

export const H1Statistic = styled(Box)<{
  mb: boolean;
}>`
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
  height: 100%;
`;

// FOOTER STYLES
export const FooterContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0.3rem;
  background-color: ${COLORS.LIGHTGRAY};
  width: 100%;
`;

export const FooterButtonContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  padding: 0.1rem;
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

export const EmbedWrapper = styled(Box)`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;

  @media screen and (min-width: 600px) {
    flex-grow: 1;
    justify-content: space-between;
  }
`;

export const EmbedFooterWrapper = styled(Box)`
  ${PreviewFooterStyles}
  width: 100%;
  font-size: 10px;
  padding: 0.7rem 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 0 0 4px 4px;
`;

export const EmbedBody = styled(Box)`
  width: 100%;
`;

export const EmbedHeaderWrapper = styled(Box)`
  ${PreviewHeaderStyles}
  width: 100%;
  padding: 13px 14px;
`;

export const FooterDate = styled(Typography)`
  font-family: 'Source Code Pro', Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  font-size: 10px;
  font-weight: 400;
  line-height: 0.875rem;
  color: rgba(0, 0, 0, 0.7);
`;

export const LogoWrapper = styled.a`
  padding-top: 7px;
  padding-right: 1.5rem;
  cursor: pointer;
`;

export const EmbedHeader = styled(Typography)`
  font-size: 17px;
  line-height: 1.25rem;
  margin-bottom: 0.25rem;
  font-weight: 700;
`;

export const EmbedSubheader = styled(Typography)`
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.7);
  line-height: 0.875rem;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.04em;
`;
