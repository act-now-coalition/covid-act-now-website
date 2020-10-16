import React from 'react';
import { Switch, Grid } from '@material-ui/core';
import { SwitchGrid, SwitchLabel } from './SwitchComponent.style';

const SwitchComponent = (props: {
  leftLabel: string;
  rightLabel: string;
  checkedValue: boolean | undefined;
  onChange: any;
  gridOnClick: any;
  isModal?: boolean;
}) => {
  const {
    leftLabel,
    rightLabel,
    checkedValue,
    onChange,
    gridOnClick,
    isModal,
  } = props;
  return (
    <SwitchGrid
      container
      alignItems="center"
      spacing={1}
      viewAllCounties={checkedValue}
      isModal={isModal}
    >
      <SwitchLabel onClick={() => gridOnClick(false)} item>
        {leftLabel}
      </SwitchLabel>
      <Grid item>
        <Switch
          checked={checkedValue}
          onChange={onChange}
          value="checked"
          size="small"
          disableRipple
        />
      </Grid>
      <SwitchLabel onClick={() => gridOnClick(true)} item>
        {rightLabel}
      </SwitchLabel>
    </SwitchGrid>
  );
};

export default SwitchComponent;
