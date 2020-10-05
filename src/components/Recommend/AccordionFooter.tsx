import React, { Fragment } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const AccordionItem: React.FC = () => {
  return (
    <Fragment>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Footer item
        </AccordionSummary>
        <AccordionDetails>Details</AccordionDetails>
      </Accordion>
    </Fragment>
  );
};

const AccordionFooter: React.FC = () => {
  return <AccordionItem />;
};

export default AccordionFooter;
