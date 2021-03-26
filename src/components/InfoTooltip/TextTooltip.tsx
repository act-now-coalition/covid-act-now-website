import React, { useState } from 'react';
import {
  StyledTooltip,
  StyledCloseIcon,
  SmallTooltipAnchorText,
} from './Tooltip.style';
import { StyledTooltipProps } from 'components/InfoTooltip';
import VisuallyHiddenDiv from 'components/VisuallyHidden/VisuallyHidden';
import { useBreakpoint } from 'common/hooks';
import { tooltipAnchorOnClick } from 'components/InfoTooltip';
import { v4 as uuidv4 } from 'uuid';

const TextTooltip: React.FC<StyledTooltipProps> = props => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpoint(600);

  const idForAccessability = uuidv4();

  const AnchorTextComponent = props.altAnchorComponent
    ? props.altAnchorComponent
    : SmallTooltipAnchorText;

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
        aria-describedby={idForAccessability}
      >
        <AnchorTextComponent
          tabIndex={0}
          role="button"
          onClick={() => tooltipAnchorOnClick(isMobile, () => setIsOpen(true))}
        >
          {props.mainCopy}
        </AnchorTextComponent>
      </StyledTooltip>
      <VisuallyHiddenDiv content={props.title} elemId={idForAccessability} />
    </>
  );
};

export default TextTooltip;
