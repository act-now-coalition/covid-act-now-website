import styled from 'styled-components';

import { COLORS } from 'enums';
import { INTERVENTIONS } from 'enums/interventions';
import palette from 'assets/theme/palette';
import { snakeCase } from 'lodash';
import { colors } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { COLOR_MAP } from '../../enums/interventions';

export const ChartContainer = styled.section`
  width: 100%;
`;

export const DisclaimerWrapper = styled.div`
  display: flex;
  margin: 0 -0.75rem;

  @media (max-width: 900px) {
    flex-direction: column;
    margin: 0;
  }
`;

export const Disclaimer = styled.div`
  background: ${palette.white};
  border: 1px solid ${palette.divider};
  padding: 1.5rem;
  border-radius: 4px;
  margin: 0 0.75rem 1.5rem;
  padding: 1rem;
  flex: 1;

  @media (max-width: 900px) {
    margin: 0 1rem 1.5rem;
  }
`;

export const DisclaimerHeader = styled(Typography)`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.6rem;
  color: ${palette.black};
`;

export const DisclaimerBody = styled(Typography)``;

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
  .limited-action {
    fill: ${props =>
      props.projections.getChartSeriesColorMap().limitedActionSeries};
    stroke: ${props =>
      props.isInferred
        ? props.projections.getChartSeriesColorMap().limitedActionSeries
        : 'white'};
    fill-opacity: 1;
  }
  /* Social distancing */
  .social-distancing {
    fill: ${props =>
      props.projections.getChartSeriesColorMap().socialDistancingSeries};
    stroke: ${props =>
      props.isInferred
        ? props.projections.getChartSeriesColorMap().socialDistancingSeries
        : 'white'};
    fill-opacity: 1;
  }
  /* Stay at home */
  .stay-at-home {
    fill: ${props =>
      props.projections.getChartSeriesColorMap().shelterInPlaceSeries};
    stroke: ${props =>
      props.isInferred
        ? props.projections.getChartSeriesColorMap().shelterInPlaceSeries
        : 'white'};
    fill-opacity: 1;
  }
  /* Available beds */
  .beds {
    stroke: white;
    stroke-width: 1px;
    stroke-dasharray: 8, 8;
  }
  .beds {
    fill: rgba(0, 0, 0, 0.7);
    stroke: rgba(0, 0, 0, 0.7);
  }
  .highcharts-plot-line {
    stroke: #ff3348;
    stroke-width: 3px;
  }
  /* Projected */
  .projected {
    stroke: ${props =>
      props.projections.getChartSeriesColorMap().projectedSeries};
  }
  .${snakeCase(INTERVENTIONS.LIMITED_ACTION)} {
    stroke: ${props => props.projections.getAlarmLevelColor()};
  }
  .${snakeCase(INTERVENTIONS.SOCIAL_DISTANCING)} {
    stroke: ${props =>
      props.projections.getAlarmLevelColor() === COLOR_MAP.GREEN.BASE
        ? COLOR_MAP.GREEN.DARK
        : props.projections.getAlarmLevelColor()};
  }
  .${snakeCase(INTERVENTIONS.SHELTER_IN_PLACE)} {
    stroke: ${props => props.projections.getAlarmLevelColor()};
  }
  .${snakeCase(INTERVENTIONS.SHELTER_IN_PLACE_WORST_CASE)} {
    stroke: ${props =>
      props.projections.getAlarmLevelColor() === COLOR_MAP.GREEN.BASE
        ? COLOR_MAP.GREEN.DARK
        : props.projections.getAlarmLevelColor()};
  }
  .${snakeCase(INTERVENTIONS.LOCKDOWN)} {
    stroke: ${props => props.projections.getAlarmLevelColor()};
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

    &.custom-plot-label-reverse {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
    }

    &.custom-plot-label-hospital-overload {
      background: ${props =>
        props.projections.getAlarmLevelColor() === COLOR_MAP.GREEN.BASE
          ? COLOR_MAP.GREEN.DARK
          : props.projections.getAlarmLevelColor()};
    }
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
