import React, { useState } from 'react';
import { InfoIcon, StyledTooltip } from './Tooltip.style';
import { StyledTooltipProps } from 'components/InfoTooltip';

const InfoTooltip: React.FC<StyledTooltipProps> = props => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledTooltip
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      title={props.title}
    >
      <InfoIcon isOpen={isOpen} />
    </StyledTooltip>
  );
};

export default InfoTooltip;
