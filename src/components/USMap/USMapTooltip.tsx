import { TooltipProps } from '@material-ui/core/Tooltip';
import React from 'react';
import { Tooltip } from './USMap.style';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export enum TooltipMode {
  ACTIVATE_ON_HOVER,
  ACTIVATE_ON_CLICK,
}

interface USMapTooltipProps extends TooltipProps {
  tooltipMode: TooltipMode;
}

/**
 * This tooltip implementation wraps material-ui Tooltip with a couple additions:
 *  * Supports a `TooltipMode.ACTIVATE_ON_CLICK` mode for use on mobile devices
 *    where hover isn't possible.
 *  * Minor builtin styling (light background, etc.)
 */
export const USMapTooltip: React.FC<USMapTooltipProps> = ({
  tooltipMode,
  children,
  ...otherProps
}) => {
  if (tooltipMode === TooltipMode.ACTIVATE_ON_HOVER) {
    return <Tooltip {...otherProps}>{children}</Tooltip>;
  } else {
    return (
      <ActivateOnClickTooltip {...otherProps}>
        {children}
      </ActivateOnClickTooltip>
    );
  }
};

/**
 * Version of the tooltip that triggers on click instead of hover.
 * Modeled off of https://material-ui.com/components/tooltips/#triggers
 */
export const ActivateOnClickTooltip: React.FC<TooltipProps> = ({
  children,
  onOpen,
  onClose,
  ...otherProps
}) => {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = (e: React.ChangeEvent<{}>) => {
    if (open) {
      setOpen(false);
      onClose && onClose(e);
    }
  };

  const handleTooltipOpen = (e: React.MouseEvent) => {
    if (!open) {
      setOpen(true);
      onOpen && onOpen(e);
    }
    e.preventDefault();
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <g onClickCapture={handleTooltipOpen}>
        <Tooltip
          interactive
          enterDelay={0}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          {...otherProps}
        >
          {children}
        </Tooltip>
      </g>
    </ClickAwayListener>
  );
};
