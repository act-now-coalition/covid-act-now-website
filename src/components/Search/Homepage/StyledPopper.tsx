import React from 'react';
import Popper from '@material-ui/core/Popper';

type PopperProps = React.ComponentProps<typeof Popper>;
type FinalPopperProps = PopperProps & { isMobile: boolean };

/**
 * The default popper component built into MUI autocomplete has a handful
 * of inline styles that I couldn't figure out how to override
 * without hardcoding these inline styles below :)
 */
const StyledPopper: React.FC<FinalPopperProps> = ({
  isMobile,
  ...otherProps
}) => {
  // Remove use of hardcoded width
  const width = isMobile ? '350px' : '700px';
  const marginTop = isMobile ? '50px' : '58px';

  return (
    <Popper
      {...otherProps}
      style={{ width: width, marginTop: marginTop }}
      placement="bottom"
    />
  );
};

export default StyledPopper;
