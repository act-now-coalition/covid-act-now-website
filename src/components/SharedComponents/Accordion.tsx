import React from 'react';
import { AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  StyledMuiAccordion,
  StyledAccordionSummary,
  MarkdownBody,
} from './Accordion.style';

const StyledAccordion = (props: {
  summaryText: string;
  detailText: string;
  onExpand?: (summaryText: string) => void;
}) => {
  const { summaryText, detailText, onExpand } = props;

  const onChange = (event: React.ChangeEvent<{}>, expanded: boolean) => {
    if (expanded && onExpand) {
      onExpand(summaryText);
    }
  };

  return (
    <StyledMuiAccordion onChange={onChange}>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        {summaryText}
      </StyledAccordionSummary>
      <AccordionDetails>
        <MarkdownBody>{detailText}</MarkdownBody>
      </AccordionDetails>
    </StyledMuiAccordion>
  );
};

export default StyledAccordion;
