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
}) => {
  const { summaryText, detailText } = props;

  return (
    <StyledMuiAccordion>
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
