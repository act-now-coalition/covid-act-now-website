import styled from 'styled-components';
import palette from 'assets/theme/palette';

const color = {
  lightGrey: palette.lightGray,
  black: palette.black,
  white: palette.white,
};

const charts = {
  fontFamily: "'Source Code Pro', 'Roboto', sans-serif",
  fontWeight: 'bold',
  fontSize: '13px',
  series: {
    lineWidth: '4px',
  },
};

const tooltip = {
  width: '160px',
  boxShadow: `3px 3px 5px ${palette.chart.tooltip.shadow}`,
  fontSizeTitle: '11px',
};

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
    fill: ${palette.chart.axis};
  }
  line {
    stroke: ${palette.chart.axis};
  }
`;

export const LineGrid = styled.g`
  line,
  path {
    fill: none;
    stroke: ${palette.chart.grid};
    stroke-opacity: 0.6;
    stroke-dasharray: 4, 3;
    stroke-width: 1px;
  }
`;

export const SeriesLine = styled.g`
  line,
  path {
    fill: none;
    stroke: ${props => (props.stroke ? props.stroke : palette.black)};
    stroke-width: ${charts.series.lineWidth};
    stroke-linecap: round;
  }
`;

export const SeriesDashed = styled(SeriesLine)`
  line,
  path {
    stroke-dasharray: 1, 6;
  }
`;

export const SeriesArea = styled.g`
  path {
    fill: ${palette.chart.area};
    stroke: none;
  }
`;

export const CircleMarker = styled.circle`
  stroke: white;
  stroke-width: 2px;
`;

export const TextAnnotation = styled.g`
  rect {
    fill: ${color.white};
    fill-opacity: 1;
    stroke: none;
    rx: 3;
    ry: 3;
  }
  text {
    font-family: ${charts.fontFamily};
    font-weight: ${charts.fontWeight};
    font-size: ${charts.fontSize};
    fill: ${palette.chart.annotation};
    text-anchor: middle;
    dominant-baseline: middle;
  }
`;

export const RegionAnnotation = styled(TextAnnotation)<{ isActive: boolean }>`
  rect {
    fill: ${props => (props.isActive ? props.color : palette.white)};
    stroke: ${props => (props.isActive ? props.color : palette.lightGray)};
    stroke-width: 1px;
  }
  text {
    fill: ${props => (props.isActive ? palette.white : props.color)};
    text-anchor: end;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  transform: translate(-50%, calc(-100% - 15px));
  pointer-events: none;
  font-family: ${charts.fontFamily};
  font-weight: ${charts.fontWeight};
  font-size: ${charts.fontSize};
  width: ${tooltip.width};
  color: ${palette.chart.tooltip.text};
  background-color: ${palette.chart.tooltip.background};
  box-shadow: ${palette.chart.tooltip.shadow};
  padding: 5px 10px;
  border-radius: 3px;
`;

export const TooltipTitle = styled.div`
  font-size: ${tooltip.fontSizeTitle};
`;
