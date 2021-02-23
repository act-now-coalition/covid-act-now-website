import React, { useState } from 'react';
import { StyledSpan, StyledTooltip, StyledCloseIcon } from './Tooltip.style';
import { StyledTooltipProps } from 'components/InfoTooltip';
import VisuallyHiddenDiv from 'components/VisuallyHidden/VisuallyHidden';
import { useBreakpoint } from 'common/hooks';
import { tooltipAnchorOnClick } from 'components/InfoTooltip';

const DisclaimerTooltip: React.FC<StyledTooltipProps> = props => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpoint(600);

  return (
    <>
      <StyledTooltip
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        title={
          <>
            <StyledCloseIcon role="button" onClick={() => setIsOpen(false)} />
            {props.title}
          </>
        }
        open={isOpen}
        leaveTouchDelay={60000} // for mobile: long leaveTouchDelay makes the tooltip stay open until close-icon is clicked
        aria-describedby={props.ariaDescribedById}
      >
        <StyledSpan
          tabIndex={0}
          role="button"
          onClick={() => tooltipAnchorOnClick(isMobile, () => setIsOpen(true))}
        >
          {props.mainCopy}
        </StyledSpan>
      </StyledTooltip>
      <VisuallyHiddenDiv
        content={props.title}
        elemId={props.ariaDescribedById}
      />
    </>
  );
};

export default DisclaimerTooltip;
