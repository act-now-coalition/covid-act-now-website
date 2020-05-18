import styled from 'styled-components';
import palette from '../../assets/theme/palette';
import { Level } from 'common/level';
import { LEVEL_COLOR } from 'common/colors';

const chartFontFamily = "'Source Code Pro', 'Roboto', sans-serif";

export const ZoneChartWrapper = styled.div`
  @media (min-width: 996px) {
    margin-left: -3rem;
  }

  @media print {
    width: 100%;
    > div {
      transform: scale(0.9);
      transform-origin: center left;
    }
  }

  .highcharts-axis-labels.highcharts-yaxis-labels {
    /* Highcharts sets inline styles, so we need !important to increase specificity */
    text,
    span {
      font-family: ${chartFontFamily} !important;
      font-size: 13px !important;
    }
  }

  .highcharts-axis-labels.highcharts-xaxis-labels {
    /* Highcharts sets inline styles, so we need !important to increase specificity */
    text,
    span {
      font-family: ${chartFontFamily} !important;
      font-size: 13px !important;
    }
  }

  .highcharts-yaxis-grid .highcharts-grid-line {
    stroke: ${palette.black};
    stroke-opacity: 0.6;
    stroke-width: 1px;
    stroke-dasharray: 4, 3;
  }
  .ZoneChart__Line {
    stroke-width: 4px;
  }

  .ZoneChart__AreaRange {
    .highcharts-area {
      fill: ${palette.black};
      fill-opacity: 0.07;
    }
    .highcharts-graph {
      stroke: none;
    }
    &.highcharts-series-inactive {
      opacity: 1;
    }
  }

  .ZoneAnnotation--CurrentValue {
    text {
      fill: ${palette.primary.contrastText};
    }
    &.ZoneAnnotation rect {
      fill-opacity: 1;
      fill: ${palette.white};
      stroke: none;
    }
  }

  .ZoneAnnotation {
    rect {
      fill: ${palette.white};
      stroke: ${palette.black};
      stroke-opacity: 0.12;
      fill-opacity: 1;
    }
    text {
      font-family: ${chartFontFamily};
    }
  }

  .ZoneAnnotation--isActive {
    &.ZoneAnnotation--2 rect {
      fill: ${LEVEL_COLOR[Level.HIGH]};
      stroke: none;
    }
    &.ZoneAnnotation--1 rect {
      fill: ${LEVEL_COLOR[Level.MEDIUM]};
      stroke: none;
    }
    &.ZoneAnnotation--0 rect {
      fill: ${LEVEL_COLOR[Level.LOW]};
      stroke: none;
    }
  }

  .ZoneAnnotation--isActive--flippedOrder {
    &.ZoneAnnotation--2 rect {
      fill: ${LEVEL_COLOR[Level.LOW]};
      stroke: none;
    }
    &.ZoneAnnotation--1 rect {
      fill: ${LEVEL_COLOR[Level.MEDIUM]};
      stroke: none;
    }
    &.ZoneAnnotation--0 rect {
      fill: ${LEVEL_COLOR[Level.HIGH]};
      stroke: none;
    }
  }
`;
