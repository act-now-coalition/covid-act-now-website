import styled from 'styled-components';

// Params
const axis = {
  fontFamily: "'Source Code Pro', 'Roboto', sans-serif",
  fontSize: '13px',
  fontWeight: '400',
  color: '#666',
};

const line = {
  strokeWidth: '3px',
  stroke: 'black',
};

const area = {
  fill: '#eee',
};

const grid = {
  stroke: '#000',
  strokeOpacity: 0.6,
  strokeDasharray: '4, 3',
  strokeWidth: '1px',
};

export const PointCircle = styled.circle`
  fill: ${props => props.fill};
  stroke: white;
  stroke-width: 2px;
`;

export const AxisWrapper = styled.g`
  text {
    font-family: ${axis.fontFamily};
    font-size: ${axis.fontSize};
    font-weight: ${axis.fontWeight};
    fill: ${axis.color};
  }
  line {
    fill: ${axis.color};
  }
`;

export const LineChart = styled.g`
  stroke: ${props => props.color};
  stroke-width: ${line.strokeWidth};
  stroke-linecap: round;
`;

export const AreaRange = styled.g`
  fill: ${area.fill};
  stroke: none;
`;

export const DashedLine = styled.g`
  line {
    stroke: ${grid.stroke};
    stroke-opacity: ${grid.strokeOpacity};
    stroke-width: ${grid.strokeWidth};
    stroke-dasharray: ${grid.strokeDasharray};
  }
`;

export const TextAnnotation = styled.text`
  font-family: ${axis.fontFamily};
  font-size: 14px;
  font-weight: ${axis.fontWeight};
  dominant-baseline: middle;
  fill: #000;
`;

export const TextCurrentValue = styled(TextAnnotation)`
  text-anchor: start;
`;

export const TextZone = styled(TextAnnotation)`
  text-anchor: end;
  fill: ${props => props.fill};
`;

export const RegionChartWrapper = styled.div`
  /* This is needed to position the tooltip */
  position: relative;
`;
