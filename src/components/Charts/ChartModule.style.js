import styled from 'styled-components';

import { COLORS } from 'enums';
import { colors } from '@material-ui/core';

export const ChartContainer = styled.section`
  width: 100%;
`;

export const ChartHeader = styled.div`
  max-width: 900px;
  padding: 1.5rem 0;
  text-align: left;

  span {
    color: rgba(0, 0, 0, 0.7);
  }

  h2 {
    font-weight: 700;
  }

  @media (max-width: 600px) {
    padding: 1.5rem 1rem;
  }
`;

export const Wrapper = styled.div`
  max-width: 900px;
  margin: auto;

  .highcharts-axis-labels {
    font-family: 'Roboto', sans-serif;
    font-weight: 'Medium';
    font-size: 13px;
    color: rgba(0, 0, 0, 0.5);

    span {
      padding: 8px 8px;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 16px;
    }
  }

  /* Don't show a label for 0
     because it overlaps with the x-axis */
  .highcharts-yaxis-labels span:first-child {
    display: none;
  }

  /* .highcharts-tooltip-box {
    fill: black;
    fill-opacity: 0.6;
  } */
  g.highcharts-tooltip {
    display: none;
  }
  .highcharts-tooltip {
    background: none;
    padding: 0;
    border: none;
  }
  .highcharts-markers {
    stroke: white !important;
  }
  .highcharts-halo {
    fill: white !important;
    fill-opacity: 1;
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.5);
  }
  .highcharts-tooltip > span {
    background: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
    padding: 16px;
  }
  /* .highcharts-tooltip text {
    fill: white;
    text-shadow: 0 0 3px black;
  } */
  .highcharts-legend {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.7);
  }
  .highcharts-legend-item {
    cursor: pointer;
    user-select: none;
  }
  .highcharts-area {
    fill-opacity: 0.8;
  }
`;

export const CondensedLegendStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CondensedLegendItemStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.3rem;
  width: 10rem;
  margin: 3px;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${props =>
    props.bgColor && !props.darkLegendText
      ? colors.grey[50]
      : colors.grey[800]};
  box-sizing: border-box;
  background-color: ${props => props.bgColor || COLORS.LIGHTGRAY};
  border: ${props =>
    props.outline || (props.bgColor ? `1px solid ${props.bgColor}` : 'none')};
`;
