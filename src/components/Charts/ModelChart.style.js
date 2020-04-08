import styled from 'styled-components';
import { INTERVENTIONS, COLORS } from 'enums';
import { snakeCase } from 'lodash';

export const ChartContainer = styled.section`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

export const Disclaimer = styled.div`
  background: ${COLORS.LIGHTGRAY};
  margin: 2rem;
  padding: 1rem;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.7);

  @media (min-width: 900px) {
    text-align: center;
    margin: 0 0 2rem 0;
  }

  @media (min-width: 600px) {
    text-align: center;
  }
`;

export const DisclaimerContent = styled.div`
  max-width: 620px;
  margin: auto;
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
  /* these are styled according to the
     order passed into the series array */
  /* No action */
  .highcharts-series-0 {
    fill: ${props =>
      props.interventions.getChartSeriesColorMap().limitedActionSeries};
    stroke: white;
    fill-opacity: 1;
  }
  /* Social distancing */
  .highcharts-series-1 {
    fill: ${props =>
      props.interventions.getChartSeriesColorMap().socialDistancingSeries};
    stroke: white;
    fill-opacity: 1;
  }
  /* Stay at home */
  .highcharts-series-2 {
    fill: ${props =>
      props.interventions.getChartSeriesColorMap().shelterInPlaceSeries};
    stroke: white;
    fill-opacity: 1;
  }
  .highcharts-series-3 {
    stroke: white;
    stroke-width: 1px;
    stroke-dasharray: 8, 8;
  }
  .highcharts-color-3 {
    fill: rgba(0, 0, 0, 0.7);
    stroke: rgba(0, 0, 0, 0.7);
  }
  .highcharts-plot-line {
    stroke: #ff3348;
    stroke-width: 3px;
  }
  .${snakeCase(INTERVENTIONS.LIMITED_ACTION)} {
    stroke: ${props => props.interventions.getInterventionColor()};
  }
  .${snakeCase(INTERVENTIONS.SOCIAL_DISTANCING)} {
    stroke: ${props => props.interventions.getInterventionColor()};
  }
  .${snakeCase(INTERVENTIONS.SHELTER_IN_PLACE)} {
    stroke: ${props => props.interventions.getInterventionColor()};
  }
  .${snakeCase(INTERVENTIONS.SHELTER_IN_PLACE_WORST_CASE)} {
    stroke: ${props => props.interventions.getInterventionColor()};
  }
  .${snakeCase(INTERVENTIONS.LOCKDOWN)} {
    stroke: ${props => props.interventions.getInterventionColor()};
  }

  .today {
    stroke: rgba(0, 0, 0, 0.7);
    stroke-width: 3px;
  }
  .custom-plot-label {
    padding: 8px 16px 8px 12px;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;

    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 13px;
    line-height: 16px;

    color: rgba(255, 255, 255, 1);
    background: rgba(0, 0, 0, 0.7);

    span {
      font-weight: normal;
      color: rgba(255, 255, 255, 0.84);
    }

    &.custom-plot-label-${snakeCase(INTERVENTIONS.LIMITED_ACTION)} {
      background: ${props => props.interventions.getInterventionColor()};
    }

    &.custom-plot-label-${snakeCase(INTERVENTIONS.SOCIAL_DISTANCING)} {
      background: ${props => props.interventions.getInterventionColor()};
    }

    &.custom-plot-label-${snakeCase(
        INTERVENTIONS.SHELTER_IN_PLACE_WORST_CASE,
      )} {
      background: ${props => props.interventions.getInterventionColor()};
    }

    &.custom-plot-label-${snakeCase(INTERVENTIONS.SHELTER_IN_PLACE)} {
      background: ${props => props.interventions.getInterventionColor()};
    }

    &.custom-plot-label-${snakeCase(INTERVENTIONS.LOCKDOWN)} {
      background: ${props => props.interventions.getInterventionColor()};
    }
  }
`;
