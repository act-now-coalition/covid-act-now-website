import styled from 'styled-components';
import { INTERVENTIONS, INTERVENTION_COLOR_MAP } from 'enums';

const noActionColor = INTERVENTION_COLOR_MAP[INTERVENTIONS.LIMITED_ACTION];
const socialDistancingColor =
  INTERVENTION_COLOR_MAP[INTERVENTIONS.SOCIAL_DISTANCING];
const shelterInPlaceColor =
  INTERVENTION_COLOR_MAP[INTERVENTIONS.SHELTER_IN_PLACE];
const lockdownColor = INTERVENTION_COLOR_MAP[INTERVENTIONS.LOCKDOWN];

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
  /* No action */
  .highcharts-series-0 {
    fill: ${noActionColor};
    stroke: ${noActionColor};
    fill-opacity: 0.8;
  }
  /* Social distancing */
  .highcharts-series-1 {
    fill: ${socialDistancingColor};
    stroke: ${socialDistancingColor};
    fill-opacity: 0.8;
  }
  /* Shelter in place */
  .highcharts-series-2 {
    fill: ${shelterInPlaceColor};
    stroke: ${shelterInPlaceColor};
    fill-opacity: 0.8;
  }
  /* Lockdown */
  .highcharts-series-3 {
    fill: ${lockdownColor};
    stroke: ${lockdownColor};
    fill-opacity: 0.8;
  }
  .highcharts-series-4 {
    stroke: black;
  }
  .highcharts-plot-line {
    stroke: #ff3348;
    stroke-width: 3px;
  }
  .highcharts-series-0-line {
    stroke: ${noActionColor};
  }
  .highcharts-series-1-line {
    stroke: ${socialDistancingColor};
  }
  .highcharts-series-2-line {
    stroke: ${shelterInPlaceColor};
  }
  .hightcharts-series-3-line {
    stroke: ${lockdownColor}
  }
  .today {
    stroke: #d8d8d8;
    stroke-width: 1px;
  }
  .highcharts-plot-line-label {
    fill: #666666;
  }
`;
