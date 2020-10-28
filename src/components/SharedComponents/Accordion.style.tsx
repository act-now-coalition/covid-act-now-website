import styled from 'styled-components';
import { Accordion, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MarkdownContent } from 'components/Markdown';
import { COLOR_MAP } from 'common/colors';

export const StyledMuiAccordion = styled(Accordion)`
  box-shadow: none;

  &:before {
    background-color: transparent;
  }
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
  color: ${COLOR_MAP.BLUE};
  font-size: 1rem;
  line-height: 1.4;
  padding-left: 0;
  padding-right: 0;
  align-items: flex-start;
`;

export const MarkdownBody = styled(MarkdownContent)`
  color: ${COLOR_MAP.GRAY_BODY_COPY};

  p {
    font-size: 1rem;
    line-height: 1.4;
    margin: 0;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  a {
    color: ${COLOR_MAP.BLUE};
  }
`;

export const ExpandIcon = styled(ExpandMoreIcon)`
  color: ${COLOR_MAP.GRAY_ICON};
`;
