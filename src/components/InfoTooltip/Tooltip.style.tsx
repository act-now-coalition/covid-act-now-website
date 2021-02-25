import styled from 'styled-components';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { COLOR_MAP } from 'common/colors';
import { MarkdownBody } from 'components/Markdown';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import theme from 'assets/theme';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import CloseIcon from '@material-ui/icons/Close';

const TooltipWithStyles = withStyles({
  tooltip: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: '.8125rem',
    lineHeight: '1.4',
    padding: '16px',
    '& a': {
      color: 'white',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '20px 24px',
    },
  },
  arrow: {
    color: 'black',
  },
})(Tooltip);

export const StyledTooltip = styled(TooltipWithStyles).attrs(props => ({
  placement: 'bottom',
  arrow: true,
  interactive: true,
  TransitionComponent: Fade,
  enterDelay: 0,
  enterTouchDelay: 0,
}))``;

export const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  margin-left: auto;
  position: absolute;
  top: 4px;
  right: 4px;

  @media (min-width: ${materialSMBreakpoint}) {
    display: none;
  }
`;

export const InfoIcon = styled(InfoOutlinedIcon)<{ $isOpen: boolean }>`
  color: ${({ $isOpen }) =>
    $isOpen ? COLOR_MAP.BLUE : COLOR_MAP.GRAY_BODY_COPY};
  cursor: pointer;
  margin-left: 0.5rem;
  height: 18px;
  width: 18px;
`;

export const StyledMarkdown = styled(MarkdownBody)`
  p,
  a {
    color: white;
    font-size: 0.8125rem;
    line-height: 1.4;
    margin: 0;
  }

  p:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const StyledSpan = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.875rem;
`;
