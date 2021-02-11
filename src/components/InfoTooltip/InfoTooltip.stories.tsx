import React from 'react';
import InfoTooltip from './InfoTooltip';
import { StyledMarkdown } from 'components/InfoTooltip/Tooltip.style';

export default {
  title: 'Shared Components/InfoTooltip',
  component: InfoTooltip,
};

const bodyExample =
  'Also known as R(t) or “R-effective,” infection rate is important because it estimates how fast COVID is spreading right now. For example, if the R(t) is 3, it indicates that one infected person will most likely infect three other people, and those three people will each go on to infect three more people. Daily new cases may be low, but if infection rate is high, then we know that daily new cases will be high in the near future.';

export const Example = () => {
  return <InfoTooltip title={<StyledMarkdown source={bodyExample} />} />;
};
