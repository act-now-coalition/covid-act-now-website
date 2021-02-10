import React, { useState } from 'react';
import { InfoIcon, StyledTooltip } from './Tooltip.style';
import { StyledTooltipProps } from 'components/InfoTooltip';
import DescriptionDiv from './DescriptionDiv';

const InfoTooltip: React.FC<StyledTooltipProps> = props => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StyledTooltip
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        title={props.title}
      >
        <InfoIcon
          isOpen={isOpen}
          tabIndex={0}
          role="button"
          onClick={() => {}}
        />
      </StyledTooltip>
      <DescriptionDiv description={props.description} />
    </>
  );
};

export default InfoTooltip;
