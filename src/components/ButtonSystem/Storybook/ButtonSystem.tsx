import React from 'react';
import { Grid } from '@material-ui/core';
import {
  StandardOutlinedButton,
  StandardFilledButton,
  LargeOutlinedButton,
  LargeFilledButton,
} from 'components/ButtonSystem';

const ButtonSystem = () => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item>
          <StandardFilledButton href="/">Standard Filled</StandardFilledButton>
        </Grid>
        <Grid item>
          <StandardOutlinedButton href="/">
            Standard Outlined
          </StandardOutlinedButton>
        </Grid>
        <Grid item>
          <LargeFilledButton href="/">Large Filled</LargeFilledButton>
        </Grid>
        <Grid item>
          <LargeOutlinedButton href="/">Large Outlined</LargeOutlinedButton>
        </Grid>
      </Grid>
    </>
  );
};

export default ButtonSystem;
