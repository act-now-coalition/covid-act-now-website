import React from 'react';
import {
  CcviLevel,
  getCcviLevelColor,
  getCcviLevelName,
  getCcviLevel,
} from 'common/ccvi';
import { scaleLinear } from '@vx/scale';
import { v4 as uuidv4 } from 'uuid';
import { Group } from '@vx/group';

const CcviThermometer: React.FC<{ overallScore: number }> = ({
  overallScore,
}) => {
  const gradientId = uuidv4();
  const containerHeight = 34;
  const thermometerWidth = 240;
  const thermometerHeight = 20;

  const scaleWidth = scaleLinear({
    domain: [0, 1],
    range: [0, thermometerWidth],
  });

  const pointerX = scaleWidth(overallScore);

  const level = getCcviLevel(overallScore);

  // todo (chelsi): add location name, possibly edit copy
  const title = level
    ? `Thermometer image showing that locationName's vulnurability level is ${getCcviLevelName(
        level,
      ).toLowerCase()}.`
    : 'Thermometer image showing locationName vulnurability level.';

  return (
    <svg
      width={thermometerWidth}
      height={containerHeight}
      role="img"
      aria-labelledby="ccviThermometerTitle"
    >
      <title id="ccviThermometerTitle">{title}</title>
      <defs>
        <linearGradient id={gradientId}>
          <stop
            offset="20%"
            stopColor={getCcviLevelColor(CcviLevel.VERY_LOW)}
          />
          <stop offset="20%" stopColor={getCcviLevelColor(CcviLevel.LOW)} />
          <stop offset="40%" stopColor={getCcviLevelColor(CcviLevel.LOW)} />
          <stop offset="40%" stopColor={getCcviLevelColor(CcviLevel.MEDIUM)} />
          <stop offset="60%" stopColor={getCcviLevelColor(CcviLevel.MEDIUM)} />
          <stop offset="60%" stopColor={getCcviLevelColor(CcviLevel.HIGH)} />
          <stop offset="80%" stopColor={getCcviLevelColor(CcviLevel.HIGH)} />
          <stop
            offset="80%"
            stopColor={getCcviLevelColor(CcviLevel.VERY_HIGH)}
          />
        </linearGradient>
      </defs>
      <Group left={pointerX}>
        <polygon points={`-6,0 0,6 6,0`} fill="black" />
      </Group>
      <rect
        fill={`url(#${gradientId})`}
        width={thermometerWidth}
        height={thermometerHeight}
        y={containerHeight - thermometerHeight}
        rx={thermometerHeight / 2}
        ry={thermometerHeight / 2}
      />
    </svg>
  );
};

export default CcviThermometer;
