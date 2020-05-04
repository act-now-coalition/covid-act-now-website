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

  .chart-annotation {
    font-family: ${axis.fontFamily};
  }

  .chart-annotation--current-value {
    text-anchor: start;
    dominant-baseline: middle;
    font-size: 14px;
    font-weight: bold;
    fill: #000;
  }

  .chart-annotation--zone {
    text {
      text-anchor: end;
      font-size: 14px;
      font-weight: bold;
    }
  }

  .chart-annotation--zone-high {
    text {
      fill: #f03147;
    }
  }

  .chart-annotation--zone-medium {
    text {
      fill: #ffad16;
    }
  }

  .chart-annotation--zone-low {
    text {
      fill: #00d07d;
    }
  }
`;
