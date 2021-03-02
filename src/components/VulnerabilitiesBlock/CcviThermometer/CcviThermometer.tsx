import React from 'react';
import { keyBy } from 'lodash';
import {
  CcviLevel,
  getCcviLevelColor,
  getCcviLevelName,
  getCcviLevel,
} from 'common/ccvi';
import { scalePoint } from '@vx/scale';
import { v4 as uuidv4 } from 'uuid';
import { Group } from '@vx/group';
import { CCVI_LEVEL_INFO_MAP } from 'common/ccvi';

const CcviThermometer: React.FC<{
  overallScore: number;
  regionName: string;
}> = ({ overallScore, regionName }) => {
  const gradientId = uuidv4();
  const titleId = uuidv4();

  const containerHeight = 34;
  const thermometerWidth = 240;
  const thermometerHeight = 20;
  const thermometerBorderRadius = thermometerHeight / 2;

  const mapByColor = keyBy(CCVI_LEVEL_INFO_MAP, level => level.color);

  const scaleWidth = scalePoint({
    domain: Object.keys(mapByColor),
    range: [0, thermometerWidth],
    padding: 0.5,
  });

  const level = getCcviLevel(overallScore);

  const pointerX = scaleWidth(CCVI_LEVEL_INFO_MAP[level].color);

  // todo (chelsi): add location name, possibly edit copy
  const title = level
    ? `Thermometer image showing that ${regionName}'s vulnerability level is ${getCcviLevelName(
        level,
      ).toLowerCase()}.`
    : `Thermometer image showing ${regionName}'s vulnerability level.`;

  return (
    <svg
      width={thermometerWidth}
      height={containerHeight}
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>{title}</title>
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
        <circle r="2" fill="blue" cy={8} />
      </Group>
      <rect
        fill={`url(#${gradientId})`}
        width={thermometerWidth}
        height={thermometerHeight}
        y={containerHeight - thermometerHeight}
        rx={thermometerBorderRadius}
        ry={thermometerBorderRadius}
      />
      <rect
        width={thermometerWidth / 5}
        height={thermometerHeight}
        x={(3 * thermometerWidth) / 5}
        y={containerHeight - thermometerHeight}
        fill="red"
      />
      {/* </Group> */}
    </svg>
  );
};

export default CcviThermometer;
