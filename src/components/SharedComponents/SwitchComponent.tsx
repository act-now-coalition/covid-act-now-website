import React from 'react';
import { Switch, Grid } from '@material-ui/core';
import { SwitchGrid, SwitchLabel } from './SwitchComponent.style';

const SwitchComponent = (props: {
  leftLabel: string;
  rightLabel: string;
  checked: boolean | undefined;
  onChange: (newValue: boolean) => void;
  isModal?: boolean;
}) => {
  const { leftLabel, rightLabel, checked, onChange, isModal } = props;

  return (
    <SwitchGrid
      container
      alignItems="center"
      spacing={1}
      checked={checked}
      isModal={isModal}
    >
      <SwitchLabel onClick={() => onChange(false)} item>
        {leftLabel}
      </SwitchLabel>
      <Grid item>
        <Switch
          checked={checked}
          onChange={event => onChange(event.target.checked)}
          value="checked"
          size="small"
          disableRipple
        />
      </Grid>
      <SwitchLabel onClick={() => onChange(true)} item>
        {rightLabel}
      </SwitchLabel>
    </SwitchGrid>
  );
};

export default SwitchComponent;
