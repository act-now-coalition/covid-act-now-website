import React, { useState } from 'react';
import { InfoIcon, getTooltipStyles } from './InfoTooltip.style';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';

type StyledTooltipProps = Omit<TooltipProps, 'children'>;

const StyledTooltip: React.FC<StyledTooltipProps> = props => {
  const styles = getTooltipStyles();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Tooltip
      placement="bottom"
      arrow={true}
      interactive
      TransitionComponent={Fade}
      classes={{
        tooltip: styles.tooltip,
        arrow: styles.arrow,
      }}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      {...props}
    >
      <InfoIcon isOpen={isOpen} />
    </Tooltip>
  );
};

export default StyledTooltip;
