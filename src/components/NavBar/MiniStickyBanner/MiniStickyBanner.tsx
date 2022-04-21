import React from 'react';
import { Box } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExternalLink from 'components/ExternalLink';

const MiniStickyBanner: React.FC = () => {
  return (
    <Box
      bgcolor={COLOR_MAP.GREEN.BASE}
      color={COLOR_MAP.GREEN.DARK}
      p={0.5}
      fontSize="12px"
      textAlign="center"
    >
      <ExternalLink
        href="https://docs.google.com/document/d/19i6aWbMcAHPImWGwY1KoGlkCBqP-DDSQlDE1PO0QthE/"
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        &#128075; &nbsp; We’re hiring a senior front-end engineer! Join the team
        behind Covid Act Now &nbsp;
        <ArrowForwardIosIcon fontSize="inherit" style={{ paddingTop: '4px' }} />
      </ExternalLink>
    </Box>
  );
};

export default MiniStickyBanner;
