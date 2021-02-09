import React from 'react';
import { getTooltipStyles } from './InfoTooltip.style';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';

const StyledTooltip: React.FC<TooltipProps> = props => {
  const styles = getTooltipStyles();

  return (
    <Tooltip
      placement="bottom"
      arrow
      interactive
      TransitionComponent={Fade}
      classes={{
        tooltip: styles.tooltip,
        arrow: styles.arrow,
      }}
      {...props}
    />
  );
};

export default StyledTooltip;
