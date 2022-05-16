/** Small sticky green banner that sits above navbar */

import React from 'react';
import styled from 'styled-components';
import { Box, Typography } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';

const BannerText = styled(Typography)`
  font-size: 0.75rem;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0;
`;

const MiniStickyBanner: React.FC = ({ children }) => {
  return (
    <Box bgcolor={COLOR_MAP.GREEN.BASE} py={0.75} px={1}>
      <BannerText>{children}</BannerText>
    </Box>
  );
};

export default MiniStickyBanner;
