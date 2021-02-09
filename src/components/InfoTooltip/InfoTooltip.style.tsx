import styled from 'styled-components';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { COLOR_MAP } from 'common/colors';
import { makeStyles } from '@material-ui/core/styles';
import { MarkdownBody } from 'components/Markdown';

export const getTooltipStyles = makeStyles(theme => ({
  tooltip: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: '.8125rem',
    lineHeight: '1.4',
    padding: '16px',
    [theme.breakpoints.down('xs')]: {
      padding: '16px 24px',
    },
  },
  arrow: {
    color: 'black',
  },
}));

export const InfoIcon = styled(InfoOutlinedIcon)`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
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
`;
