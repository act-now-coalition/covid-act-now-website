import styled from 'styled-components';

const charts = {
  fontFamily: "'Source Code Pro', 'Roboto Mono', monospace",
  fontWeight: 'bold',
  fontSize: '13px',
  series: {
    lineWidth: '4px',
  },
};

const tooltip = {
  width: '200px',
  fontSizeTitle: '11px',
};

/** Gets the chart palette based on the current theme. */
function palette(props: any) {
  return props.theme.palette.chart;
}

export const ChartContainer = styled.div`
  /* TODO(@pnavarrc): This negative margin breaks the auto-size of the chart */
  @media (min-width: 996px) {
    margin-left: -3rem;
  }
`;

export const PositionRelative = styled.div`
  position: relative;
`;

export const Axis = styled.g`
  text {
    font-family: ${charts.fontFamily};
    font-weight: ${charts.fontWeight};
    font-size: ${charts.fontSize};
    fill: ${props => palette(props).axis};
  }
  line {
    stroke: ${props => palette(props).axis};
  }
`;

export const LineGrid = styled.g`
  line,
  path {
    fill: none;
    stroke: ${props => palette(props).grid};
    stroke-opacity: 0.6;
    stroke-dasharray: 4, 3;
    stroke-width: 1px;
  }
`;

export const SeriesLine = styled.g`
  line,
  path {
    fill: none;
    stroke: ${props =>
      props.stroke ? props.stroke : palette(props).foreground};
    stroke-width: ${charts.series.lineWidth};
    stroke-linecap: round;
  }
`;

export const SeriesDotted = styled(SeriesLine)`
  line,
  path {
    stroke-dasharray: 1, 6;
  }
`;

export const SeriesDashed = styled(SeriesLine)`
  line,
  path {
    stroke-dasharray: 1, 6;
    stroke-linecap: square;
  }
`;

export const SeriesArea = styled.g`
  path {
    fill: ${props => palette(props).area};
    stroke: none;
  }
`;

export const CircleMarker = styled.circle`
  stroke: white;
  stroke-width: 2px;
`;

export const TextAnnotation = styled.g`
  rect {
    fill: ${props => palette(props).background};
    fill-opacity: 1;
    stroke: none;
    rx: 3;
    ry: 3;
  }
  text {
    font-family: ${charts.fontFamily};
    font-weight: ${charts.fontWeight};
    font-size: ${charts.fontSize};
    fill: ${props => palette(props).annotation};
    text-anchor: ${props => props.textAnchor || 'middle'};
    dominant-baseline: ${props => props.dominantBaseline || 'middle'};
  }
`;

export const RegionAnnotation = styled(TextAnnotation)<{ isActive: boolean }>`
  rect {
    fill: ${props =>
      props.isActive ? props.color : palette(props).background};
    stroke: ${props =>
      props.isActive || palette(props).isDarkMode
        ? props.color
        : props.theme.palette.lightGray};
    stroke-width: 1px;
  }
  text {
    fill: ${props =>
      props.isActive ? palette(props).background : props.color};
    text-anchor: end;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  pointer-events: none;
  transform: translate(-50%, calc(-100% - 15px));
  width: ${tooltip.width};
  padding: 12px;
  border-radius: 3px;
  font-family: ${charts.fontFamily};
  font-weight: ${charts.fontWeight};
  font-size: ${charts.fontSize};
  line-height: 1.4;
  color: ${props => palette(props).tooltip.text};
  background-color: ${props => palette(props).tooltip.background};
  box-shadow: 2px 2px 6px ${props => palette(props).tooltip.shadow};
`;

export const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 600px) {
    flex-direction: row;
  }
  justify-content: center;
  > * {
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const LegendItem = styled.div`
  flex: 0 1 auto;
  align-items: center;
  > * {
    margin-right: 4px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const LegendLabel = styled.span`
  font-family: ${charts.fontFamily};
  font-size: 11px;
  font-weight: bold;
  color: ${props => palette(props).axis};
  white-space: nowrap;
`;
