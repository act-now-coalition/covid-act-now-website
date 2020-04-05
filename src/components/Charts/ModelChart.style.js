import styled from 'styled-components';
import { INTERVENTIONS, INTERVENTION_COLOR_MAP, COLORS } from 'enums';
import { snakeCase } from 'lodash';

const noActionColor = INTERVENTION_COLOR_MAP[INTERVENTIONS.LIMITED_ACTION];
const socialDistancingColor =
  INTERVENTION_COLOR_MAP[INTERVENTIONS.SOCIAL_DISTANCING];
const shelterInPlaceColor =
  INTERVENTION_COLOR_MAP[INTERVENTIONS.SHELTER_IN_PLACE];
const shelterInPlaceWorstCaseColor =
  INTERVENTION_COLOR_MAP[INTERVENTIONS.SHELTER_IN_PLACE_WORST_CASE];
const lockdownColor = INTERVENTION_COLOR_MAP[INTERVENTIONS.LOCKDOWN];

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
    fill: ${props =>
      props.inShelterInPlace
        ? shelterInPlaceWorstCaseColor
        : socialDistancingColor};
    stroke: ${props =>
      props.inShelterInPlace
        ? shelterInPlaceWorstCaseColor
        : socialDistancingColor};
    fill-opacity: 0.8;
  }
  /* Stay at home */
  .highcharts-series-2 {
    fill: ${shelterInPlaceColor};
    stroke: ${shelterInPlaceColor};
    fill-opacity: 0.8;
  }
  .highcharts-series-3 {
    stroke: rgba(0, 0, 0, 0.7);
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
    stroke: ${noActionColor};
  }
  .${snakeCase(INTERVENTIONS.SOCIAL_DISTANCING)} {
    stroke: ${socialDistancingColor};
  }
  .${snakeCase(INTERVENTIONS.SHELTER_IN_PLACE)} {
    stroke: ${shelterInPlaceColor};
  }
  .${snakeCase(INTERVENTIONS.SHELTER_IN_PLACE_WORST_CASE)} {
    stroke: ${shelterInPlaceWorstCaseColor};
  }
  .${snakeCase(INTERVENTIONS.LOCKDOWN)} {
    stroke: ${lockdownColor};
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
      background: ${noActionColor};
    }

    &.custom-plot-label-${snakeCase(INTERVENTIONS.SOCIAL_DISTANCING)} {
      background: ${socialDistancingColor};
    }

    &.custom-plot-label-${snakeCase(
        INTERVENTIONS.SHELTER_IN_PLACE_WORST_CASE,
      )} {
      background: ${shelterInPlaceWorstCaseColor};
    }

    &.custom-plot-label-${snakeCase(INTERVENTIONS.SHELTER_IN_PLACE)} {
      background: ${shelterInPlaceColor};
    }

    &.custom-plot-label-${snakeCase(INTERVENTIONS.LOCKDOWN)} {
      background: ${lockdownColor};
    }
  }
`;
