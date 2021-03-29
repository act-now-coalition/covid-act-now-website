import React from 'react';
import { Grid } from '@material-ui/core';
import {
  StandardOutlinedButton,
  StandardFilledButton,
  LargeOutlinedButton,
  LargeFilledButton,
  StandardTextButton,
} from 'components/ButtonSystem';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const ButtonSystem = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item>
          <StandardTextButton href="/">Text button</StandardTextButton>
        </Grid>
        <Grid item>
          <StandardTextButton href="/" endIcon={<ArrowForwardIcon />}>
            Text button
          </StandardTextButton>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item>
          <StandardFilledButton href="/">Standard Filled</StandardFilledButton>
        </Grid>
        <Grid item>
          <StandardOutlinedButton href="/">
            Standard Outlined
          </StandardOutlinedButton>
        </Grid>
        <Grid item>
          <StandardFilledButton href="/" endIcon={<ArrowForwardIcon />}>
            Standard Filled
          </StandardFilledButton>
        </Grid>
        <Grid item>
          <StandardOutlinedButton href="/" endIcon={<ArrowForwardIcon />}>
            Standard Outlined
          </StandardOutlinedButton>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item>
          <LargeFilledButton href="/">Large Filled</LargeFilledButton>
        </Grid>
        <Grid item>
          <LargeOutlinedButton href="/">Large Outlined</LargeOutlinedButton>
        </Grid>
        <Grid item>
          <LargeFilledButton href="/" endIcon={<ArrowForwardIcon />}>
            Large Filled
          </LargeFilledButton>
        </Grid>
        <Grid item>
          <LargeOutlinedButton href="/" endIcon={<ArrowForwardIcon />}>
            Large Outlined
          </LargeOutlinedButton>
        </Grid>
      </Grid>
    </>
  );
};

export default ButtonSystem;
