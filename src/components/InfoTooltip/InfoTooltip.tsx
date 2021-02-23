import React, { useState } from 'react';
import { InfoIcon, StyledTooltip, StyledCloseIcon } from './Tooltip.style';
import { StyledTooltipProps } from 'components/InfoTooltip';
import VisuallyHiddenDiv from 'components/VisuallyHidden/VisuallyHidden';
import { useBreakpoint } from 'common/hooks';
import { tooltipAnchorOnClick } from 'components/InfoTooltip';

const InfoTooltip: React.FC<StyledTooltipProps> = props => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpoint(600);

  const handleOpen = () => {
    setIsOpen(true);
    props.trackOpenTooltip();
  };

  const handleClose = () => {
    setIsOpen(false);
    props.trackCloseTooltip();
  };

  return (
    <>
      <StyledTooltip
        onOpen={handleOpen}
        onClose={handleClose}
        title={
          <>
            <StyledCloseIcon role="button" onClick={handleClose} />
            {props.title}
          </>
        }
        open={isOpen}
        leaveTouchDelay={60000} // for mobile: long leaveTouchDelay makes the tooltip stay open until close-icon is clicked
        aria-describedby={props.ariaDescribedById}
      >
        <InfoIcon
          $isOpen={isOpen}
          tabIndex={0}
          role="button"
          onClick={() => tooltipAnchorOnClick(isMobile, handleOpen)}
        />
      </StyledTooltip>
      <VisuallyHiddenDiv
        content={props.title}
        elemId={props.ariaDescribedById}
      />
    </>
  );
};

export default InfoTooltip;
