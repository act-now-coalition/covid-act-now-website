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

export const RegionChartWrapper = styled.div`
  .chart__axis {
    text {
      font-family: ${axis.fontFamily};
      font-size: ${axis.fontSize};
      font-weight: ${axis.fontWeight};
      fill: ${axis.color};
    }
    line {
      fill: ${axis.color};
    }
  }

  .chart__line {
    stroke: ${line.stroke};
    stroke-width: ${line.strokeWidth};
    stroke-linecap: round;
  }

  .chart__area {
    fill: ${area.fill};
    stroke: none;
  }
  .chart__grid {
    line {
      stroke: ${grid.stroke};
      stroke-opacity: ${grid.strokeOpacity};
      stroke-width: ${grid.strokeWidth};
      stroke-dasharray: ${grid.strokeDasharray};
    }
  }
`;
