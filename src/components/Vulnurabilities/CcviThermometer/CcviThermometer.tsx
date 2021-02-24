import React from 'react';
import { CcviLevel, getCcviLevelColor } from 'common/ccvi';
import { scaleLinear } from '@vx/scale';
import { v4 as uuidv4 } from 'uuid';

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

  return (
    <svg width={thermometerWidth} height={containerHeight}>
      <defs>
        <linearGradient id={gradientId}>
          <stop
            offset="20%"
            stop-color={getCcviLevelColor(CcviLevel.VERY_LOW)}
          />
          <stop offset="20%" stop-color={getCcviLevelColor(CcviLevel.LOW)} />
          <stop offset="40%" stop-color={getCcviLevelColor(CcviLevel.LOW)} />
          <stop offset="40%" stop-color={getCcviLevelColor(CcviLevel.MEDIUM)} />
          <stop offset="60%" stop-color={getCcviLevelColor(CcviLevel.MEDIUM)} />
          <stop offset="60%" stop-color={getCcviLevelColor(CcviLevel.HIGH)} />
          <stop offset="80%" stop-color={getCcviLevelColor(CcviLevel.HIGH)} />
          <stop
            offset="80%"
            stop-color={getCcviLevelColor(CcviLevel.VERY_HIGH)}
          />
        </linearGradient>
      </defs>
      <g transform={`translate(${pointerX}, 0)`}>
        <polygon points={`-6,0 0,6 6,0`} fill="black" />
      </g>
      <rect
        fill={`url(#${gradientId})`}
        width={thermometerWidth}
        height={thermometerHeight}
        y={containerHeight - thermometerHeight}
        rx={10}
        ry={10}
      />
    </svg>
  );
};

export default CcviThermometer;
