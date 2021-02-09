import React from 'react';
import { InfoIcon, getTooltipStyles } from './InfoTooltip.style';
import Tooltip from '@material-ui/core/Tooltip';
import TooltipContent from './TooltipContent';

const InfoTooltip: React.FC<{ body: string; cta: string }> = ({
  body,
  cta,
}) => {
  const styles = getTooltipStyles();

  return (
    <Tooltip
      title={<TooltipContent body={body} cta={cta} />}
      placement="bottom"
      arrow
      open
      classes={{
        tooltip: styles.tooltip,
        arrow: styles.arrow,
      }}
    >
      <InfoIcon />
    </Tooltip>
  );
};

export default InfoTooltip;
