import React from 'react';
import { range } from 'd3-array';
import { scaleBand } from 'd3-scale';
import { ParentSize } from '@vx/responsive';
import { Label } from './VaccinationsThermometer.style';
import { thermometerBarHeight } from '../RiskLevelThermometer/RiskLevelThermometer.style';
import { COLOR_MAP } from 'common/colors';
import { v4 as uuidv4 } from 'uuid';

interface Section {
  labelTo: string;
  color: string;
}

const thermometerSections: Section[] = [
  {
    labelTo: '40%',
    color: COLOR_MAP.VACCINATIONS_BLUE[0],
  },
  {
    labelTo: '50%',
    color: COLOR_MAP.VACCINATIONS_BLUE[1],
  },
  {
    labelTo: '60%',
    color: COLOR_MAP.VACCINATIONS_BLUE[2],
  },
  {
    labelTo: '70%',
    color: COLOR_MAP.VACCINATIONS_BLUE[3],
  },
  {
    labelTo: '100%', // Does not render
    color: COLOR_MAP.VACCINATIONS_BLUE[4],
  },
];

const VaccinationsThermometer: React.FC<{ height: number; width: number }> = ({
  height,
  width,
}) => {
  const indexList = range(thermometerSections.length);
  const scaleRect = scaleBand<number>().domain(indexList).range([0, width]);
  const bandWidth = scaleRect.bandwidth();

  const clipPathId = uuidv4();

  return (
    <svg width={width} height={height}>
      <defs>
        <clipPath id={clipPathId}>
          <rect
            width={width}
            height={thermometerBarHeight}
            rx={thermometerBarHeight / 2}
            ry={thermometerBarHeight / 2}
          />
        </clipPath>
      </defs>
      {thermometerSections.map((section: Section, index: number) => (
        <g key={`group-${index}`} transform="translate(0, 2)">
          <rect
            x={scaleRect(index)}
            width={bandWidth}
            height={thermometerBarHeight}
            fill={section.color}
            clipPath={`url(#${clipPathId})`}
          />
          {/* We do not render the last label (ie. the "100%" label) */}
          {index < thermometerSections.length - 1 && (
            <Label
              x={scaleRect(index)! + bandWidth}
              y={thermometerBarHeight + 12}
              dx={5}
            >
              {section.labelTo}
            </Label>
          )}
        </g>
      ))}
      {/* Lines go in a separate group so they sit on top of the rectangles */}
      {indexList.map((index: number) => (
        <g key={`group-${index}`}>
          {index < thermometerSections.length - 1 && (
            <line
              stroke={COLOR_MAP.GRAY_BODY_COPY}
              strokeWidth={1}
              x1={scaleRect(index)! + bandWidth}
              y1="-2"
              x2={scaleRect(index)! + bandWidth}
              y2="12"
            />
          )}
        </g>
      ))}
    </svg>
  );
};

const VaccinationsThermometerAutosize: React.FC<{ height?: number }> = ({
  height = 38,
}) => (
  <div style={{ height: `${height}px`, maxWidth: '210px', width: '100%' }}>
    <ParentSize>
      {({ width }) => <VaccinationsThermometer height={height} width={width} />}
    </ParentSize>
  </div>
);

export default VaccinationsThermometerAutosize;
