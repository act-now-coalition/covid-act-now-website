import React from 'react';
import { Grid } from '@material-ui/core';
import {
  OutlinedButton,
  FilledButton,
  LargeOutlinedButton,
  LargeFilledButton,
  TextButton,
} from 'components/ButtonSystem';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const ButtonSystem = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item>
          <TextButton href="/">Text button</TextButton>
        </Grid>
        <Grid item>
          <TextButton href="/" endIcon={<ArrowForwardIcon />}>
            Text button
          </TextButton>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item>
          <FilledButton href="/">Standard Filled</FilledButton>
        </Grid>
        <Grid item>
          <OutlinedButton onClick={() => console.log('hi')}>
            Standard Outlined
          </OutlinedButton>
        </Grid>
        <Grid item>
          <FilledButton href="/" endIcon={<ArrowForwardIcon />}>
            Standard Filled
          </FilledButton>
        </Grid>
        <Grid item>
          <OutlinedButton href="/" endIcon={<ArrowForwardIcon />}>
            Standard Outlined
          </OutlinedButton>
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
      <Grid container spacing={3}>
        <Grid item>
          <ButtonGroup color="primary">
            <OutlinedButton href="/">Button 1</OutlinedButton>
            <OutlinedButton href="/">Button 2</OutlinedButton>
            <OutlinedButton href="/">Button 3</OutlinedButton>
          </ButtonGroup>
        </Grid>
      </Grid>
    </>
  );
};

export default ButtonSystem;
