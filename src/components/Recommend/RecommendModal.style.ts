import styled from 'styled-components';
import MuiTab from '@material-ui/core/Tab';
import MuiTabs from '@material-ui/core/Tabs';
import { MarkdownBody } from 'components/Markdown';
import theme from 'assets/theme';

export const Title = styled.h1`
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
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
  color: #4f4f4f;
`;

export const LevelContainer = styled.div`
  border: solid 1px #f2f2f2;
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
  background-color: rgba(242, 242, 242, 0.3);

  &.Indicator-Red .MuiTabs-indicator {
    background-color: #ff0034;
  }

  &.Indicator-Orange .MuiTabs-indicator {
    background-color: #ff9600;
  }

  &.Indicator-Yellow .MuiTabs-indicator {
    background-color: #ffc900;
  }
  &.Indicator-Green .MuiTabs-indicator {
    background-color: #00d474;
  }
`;

export const LevelDescription = styled(MarkdownBody)`
  padding: ${theme.spacing(3)}px;
  font-style: italic;
`;
