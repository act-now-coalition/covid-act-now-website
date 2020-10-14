import styled from 'styled-components';
import MuiTab from '@material-ui/core/Tab';
import MuiTabs from '@material-ui/core/Tabs';
import { MarkdownBody } from 'components/Markdown';
import Grid from '@material-ui/core/Grid';
import theme from 'assets/theme';
import { COLOR_MAP } from 'common/colors';
import { COLORS } from 'common';

export const Title = styled.h1`
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: ${theme.spacing(1) / 2}px;
`;

export const Subtitle = styled.div`
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  color: #828282;
  text-transform: uppercase;
`;

export const SourceContainer = styled(Grid).attrs(props => ({
  container: true,
}))`
  margin-top: ${2 * theme.spacing(4)}px;
  &:first-child {
    margin-top: ${theme.spacing(2)}px;
  }
`;

export const SourceTitle = styled.h2`
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
`;

export const SourceIntro = styled(MarkdownBody)`
  font-family: Roboto;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

export const LevelContainer = styled.div`
  border: solid 1px ${COLORS.LIGHTGRAY};
  border-radius: 4px;
`;

export const Tab = styled(MuiTab)`
  /* TODO(pablo): Use Typography */
  font-family: Roboto;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  text-transform: none;
  color: ${theme.palette.text.secondary};

  /* TODO: Adapt based on the breakpoints */
  min-width: 90px;

  &.Mui-selected {
    font-weight: 500;
    color: ${theme.palette.text.primary};
  }
`;

export const Tabs = styled(MuiTabs)`
  background-color: ${COLORS.LIGHTGRAY};

  &.Indicator-Red .MuiTabs-indicator {
    background-color: ${COLOR_MAP.RED.BASE};
  }

  &.Indicator-Orange .MuiTabs-indicator {
    background-color: ${COLOR_MAP.ORANGE_DARK.BASE};
  }

  &.Indicator-Yellow .MuiTabs-indicator {
    background-color: ${COLOR_MAP.ORANGE.BASE};
  }
  &.Indicator-Green .MuiTabs-indicator {
    background-color: ${COLOR_MAP.GREEN.BASE};
  }
`;

export const LevelDescription = styled(MarkdownBody)`
  padding: ${theme.spacing(3)}px;
  height: 260px;
  overflow-y: auto;
`;

export const ContentLink = styled.a`
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
  color: #00bfea;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const ModalContents = styled.div`
  border-bottom: solid 1px #f2f2f2;
  padding-bottom: ${theme.spacing(2)}px;
`;

export const ContentItem = styled.div`
  padding: ${theme.spacing(1) / 2}px 0;
`;
