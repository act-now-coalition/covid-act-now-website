import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Status from 'components/Status/Status';
import { colors } from '@material-ui/core';

import { Wrapper, HeaderSubCopy, BlackBar, RedBar } from './Header.style';

const Header = ({ children, locationName, intervention }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <BlackBar>
      <Grid
        container
        direction="row"
        style={{ color: colors.grey[60] }}
        alignItems="center"
        justify="center"
      >
        <Grid item sm="12" md="5" alignItems="flex-start" justify="center">
          <Typography
            align={isMobile ? 'center' : 'left'}
            variant="body"
            component="h3"
          >
            Why you must act now{locationName ? `: ${locationName}` : ''}
          </Typography>
        </Grid>
        <Grid item sm="12" md="7">
          <HeaderSubCopy
            mt="10px"
            align={isMobile ? 'center' : 'right'}
            color="inherit"
            component="p"
            variant="subtitle2"
          >
            {isMobile ? 'Officials' : 'Public leaders & health officials'}: The
            only thing that matters right now is the speed of your response.
          </HeaderSubCopy>

          <HeaderSubCopy
            align={isMobile ? 'center' : 'right'}
            style={{ color: colors.grey[60] }}
            component="p"
            variant="subtitle2"
          >
            This model is intended to help make fast decisions, not predict the
            future
          </HeaderSubCopy>
        </Grid>
      </Grid>
    </BlackBar>
  );
};

export default Header;
