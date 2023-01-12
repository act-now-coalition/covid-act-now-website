import { Box } from '@material-ui/core';
import ExternalLink from 'components/ExternalLink';
import React from 'react';

const LearnDisclaimer: React.FC = () => {
  return (
    <Box
      border={1}
      borderRadius={3}
      padding={1}
      bgcolor="#FFFCD9"
      maxWidth={600}
      marginBottom={3}
    >
      This page is no longer being updated with the latest information. While we
      continue to surface this content for archival purposes, we recommend that
      you visit more regularly updated resources, such as from the{' '}
      <ExternalLink href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">
        CDC
      </ExternalLink>
      .
    </Box>
  );
};

export default LearnDisclaimer;
