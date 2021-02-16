import React, { useState } from 'react';
import { StyledSpan, StyledTooltip, StyledCloseIcon } from './Tooltip.style';
import { StyledTooltipProps } from 'components/InfoTooltip';
import DescriptionDiv from './DescriptionDiv';
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
      >
        <StyledSpan
          $isOpen={isOpen}
          tabIndex={0}
          role="button"
          onClick={() => tooltipAnchorOnClick(isMobile, setIsOpen)}
        >
          {props.mainCopy}
        </StyledSpan>
      </StyledTooltip>
      <DescriptionDiv content={props.title} />
    </>
  );
};

export default DisclaimerTooltip;
