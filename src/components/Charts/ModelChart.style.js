import styled from 'styled-components';
import { COLORS } from 'enums';
import { INTERVENTIONS } from 'enums/interventions';
import palette from 'assets/theme/palette';
import { snakeCase } from 'lodash';
import { colors } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { COLOR_MAP } from '../../enums/interventions';

const chartFontFamily = "'Source Code Pro', 'Roboto', sans-serif";

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

  /* Hide the ticks and grid lines for the y-axis*/
  .highcharts-yaxis-labels {
    display: none;
  }

  .highcharts-axis-labels.highcharts-xaxis-labels {
    span {
      font-family: ${chartFontFamily} !important;
    }
  }

  .highcharts-grid-line {
    display: none;
  }
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
    stroke-dasharray: none !important; /* I'm really, really sorry */
  }
  .highcharts-halo {
    fill: white !important;
    fill-opacity: 1;
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.5);
  }
  .highcharts-tooltip > span {
    background: rgba(0, 0, 0, 0.7);
    color: ${palette.white};
    border-radius: 4px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
    padding: 16px;
  }

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
    .highcharts-graph {
      stroke: ${COLORS.LIMITED_ACTION};
      stroke-dasharray: 1, 6;
      stroke-width: 4px;
      fill-opacity: 1;
      stroke-linecap: square;
    }

    &.highcharts-markers {
      path {
        fill: ${COLORS.LIMITED_ACTION};
      }
    }
  }
  /* Projected */
  .projected {
    .highcharts-graph {
      stroke: ${COLORS.PROJECTED};
      stroke-dasharray: 1, 6;
      stroke-width: 4px;
      stroke-linecap: square;
    }

    &.highcharts-markers {
      path {
        fill: ${COLORS.PROJECTED};
      }
    }
  }
  /* Hospitalizations */
  .hospitalizations {
    .highcharts-graph {
      stroke: ${COLORS.HOSPITALIZATIONS};
      stroke-width: 4px;
      stroke-linecap: round;
    }

    &.highcharts-markers {
      path {
        fill: ${COLORS.HOSPITALIZATIONS};
      }
    }
  }

  /* Stay at home */
  .stay-at-home {
    .highcharts-graph {
      stroke: ${props =>
        props.projections.getChartSeriesColorMap().shelterInPlaceSeries};
      stroke-dasharray: 1, 6;
      stroke-width: 4px;
      stroke-linecap: square;
    }

    &.highcharts-markers {
      path {
        fill: ${props =>
          props.projections.getChartSeriesColorMap().shelterInPlaceSeries};
      }
    }
  }

  .Annotation {
    text {
      font-family: ${chartFontFamily};
    }
    &.Annotation--BedsAvailable {
      text {
        fill: ${palette.primary.contrastText};
        font-size: 18px;
      }
      rect {
        fill-opacity: 0;
        stroke: none;
      }
    }
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

  /* Available beds */
  .beds {
    .highcharts-graph {
      stroke: ${palette.black};
      stroke-opacity: 0.6;
      stroke-width: 1px;
      stroke-dasharray: 4, 3;
    }
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

    &.custom-plot-label-${snakeCase(
        INTERVENTIONS.SHELTER_IN_PLACE_WORST_CASE,
      )} {
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
