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

export const RegionChartWrapper = styled.div`
  .chart {
    background-color: #f0f0f0; /* debug */
  }

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
`;
