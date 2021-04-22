import React from 'react';
import { CircleIcon, Value, ValueWrapper } from './SummaryStats.style';

const StatValue: React.FC<{ value: any; iconColor: string }> = ({
  value,
  iconColor,
}) => {
  return (
    <>
      <ValueWrapper>
        <CircleIcon $iconColor={iconColor} />
        <Value>{value}</Value>
      </ValueWrapper>
    </>
  );
};

export default StatValue;
