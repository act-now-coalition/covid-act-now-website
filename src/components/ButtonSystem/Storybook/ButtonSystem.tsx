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
import { EventCategory } from 'components/Analytics';

const ButtonSystem = () => {
  const trackingProps = {
    trackingCategory: EventCategory.NONE,
    trackingLabel: 'storybook',
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item>
          <TextButton to="/" {...trackingProps}>
            Text button
          </TextButton>
        </Grid>
        <Grid item>
          <TextButton
            to="/"
            endIcon={<ArrowForwardIcon />}
            {...trackingProps}
          >
            Text button
          </TextButton>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item>
          <FilledButton href="www.nytimes.com" {...trackingProps}>
            Standard Filled
          </FilledButton>
        </Grid>
        <Grid item>
          <OutlinedButton onClick={() => console.log('hi')} {...trackingProps}>
            Standard Outlined
          </OutlinedButton>
        </Grid>
        <Grid item>
          <FilledButton
            href="/"
            endIcon={<ArrowForwardIcon />}
            {...trackingProps}
          >
            Standard Filled
          </FilledButton>
        </Grid>
        <Grid item>
          <OutlinedButton
            href="/"
            endIcon={<ArrowForwardIcon />}
            {...trackingProps}
          >
            Standard Outlined
          </OutlinedButton>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item>
          <LargeFilledButton href="/" {...trackingProps}>
            Large Filled
          </LargeFilledButton>
        </Grid>
        <Grid item>
          <LargeOutlinedButton href="/" {...trackingProps}>
            Large Outlined
          </LargeOutlinedButton>
        </Grid>
        <Grid item>
          <LargeFilledButton
            href="/"
            endIcon={<ArrowForwardIcon />}
            {...trackingProps}
          >
            Large Filled
          </LargeFilledButton>
        </Grid>
        <Grid item>
          <LargeOutlinedButton
            href="/"
            endIcon={<ArrowForwardIcon />}
            {...trackingProps}
          >
            Large Outlined
          </LargeOutlinedButton>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item>
          <ButtonGroup color="primary">
            <OutlinedButton href="/" {...trackingProps}>
              Button 1
            </OutlinedButton>
            <OutlinedButton href="/" {...trackingProps}>
              Button 2
            </OutlinedButton>
            <OutlinedButton href="/" {...trackingProps}>
              Button 3
            </OutlinedButton>
          </ButtonGroup>
        </Grid>
      </Grid>
    </>
  );
};

export default ButtonSystem;
