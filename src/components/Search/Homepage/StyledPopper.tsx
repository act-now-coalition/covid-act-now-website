import React from 'react';
import Popper from '@material-ui/core/Popper';

type PopperProps = React.ComponentProps<typeof Popper>;
type FinalPopperProps = PopperProps & { isMobile: boolean };

const StyledPopper: React.FC<FinalPopperProps> = ({
  isMobile,
  ...otherProps
}) => {
  return <Popper {...otherProps} placement="bottom" />;
};

export default StyledPopper;
