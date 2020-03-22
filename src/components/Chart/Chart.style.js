import styled from 'styled-components';

export const Wrapper = styled.div`
  .highcharts-tooltip-box {
    fill: black;
    fill-opacity: 0.6;
  }
  .highcharts-tooltip text {
    fill: white;
    text-shadow: 0 0 3px black;
  }
  /* these are styled according to the
     order passed into the series array */
  .highcharts-series-0 {
    fill: #ff3348;
    stroke: #ff3348;
    fill-opacity: 0.8;
  }
  .highcharts-series-1 {
    fill: #ff9000;
    stroke: #ff9000;
    fill-opacity: 0.8;
  }
  .highcharts-series-2 {
    fill: #31bbe8;
    stroke: #31bbe8;
    fill-opacity: 0.8;
  }
  .highcharts-series-3 {
    fill: #31e8bc;
    stroke: #31e8bc;
    fill-opacity: 0.8;
  }
  .highcharts-series-4 {
    stroke: black;
  }
  .highcharts-plot-line {
    stroke: #ff3348;
    stroke-width: 3px;
  }
  .today {
    stroke: #d8d8d8;
    stroke-width: 1px;
  }
  .highcharts-plot-line-label {
    fill: #666666;
    &:first-of-type {
      fill: #ff3348;
    }
  }
`;
