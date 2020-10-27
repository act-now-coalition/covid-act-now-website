import React from 'react';
import { AccordionDetails, AccordionProps } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  StyledMuiAccordion,
  StyledAccordionSummary,
  MarkdownBody,
} from './Accordion.style';

export interface StyledAccordionProps extends Omit<AccordionProps, 'children'> {
  summaryText: string;
  detailText: string;
}

const StyledAccordion: React.FC<StyledAccordionProps> = ({
  summaryText,
  detailText,
  ...otherProps
}) => {
  return (
    <StyledMuiAccordion {...otherProps}>
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
