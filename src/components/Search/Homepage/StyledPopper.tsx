import React from 'react';
import { Popper } from '@material-ui/core';

type PopperProps = React.ComponentProps<typeof Popper>;

/**
 * The default popper component built into MUI autocomplete has a handful
 * of inline styles that I couldn't figure out how to override
 * without hardcoding these inline styles below :)
 */
const StyledPopper: React.FC<PopperProps> = ({ ...otherProps }) => {
  return (
    <Popper
      {...otherProps}
      style={{ width: '670px', marginTop: '66px' }}
      placement="bottom"
    />
  );
};

export default StyledPopper;
