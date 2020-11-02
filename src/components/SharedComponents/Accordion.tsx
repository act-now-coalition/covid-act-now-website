import React from 'react';
import { AccordionDetails, AccordionProps } from '@material-ui/core';
import {
  StyledMuiAccordion,
  StyledAccordionSummary,
  AccordionMarkdownBody,
  ExpandIcon,
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
      <StyledAccordionSummary expandIcon={<ExpandIcon />}>
        {summaryText}
      </StyledAccordionSummary>
      <AccordionDetails>
        <AccordionMarkdownBody source={detailText} />
      </AccordionDetails>
    </StyledMuiAccordion>
  );
};

export default StyledAccordion;
