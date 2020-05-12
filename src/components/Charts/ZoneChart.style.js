import styled from 'styled-components';
import palette from '../../assets/theme/palette';
import { LEVEL_COLOR } from '../../enums/levels';

const chartFontFamily = "'Source Code Pro', 'Roboto', sans-serif";

export const ZoneChartWrapper = styled.div`
  @media (min-width: 996px) {
    margin-left: -3rem;
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
    &.ZoneAnnotation--High rect {
      fill: ${LEVEL_COLOR.HIGH};
      stroke: none;
    }
    &.ZoneAnnotation--Medium rect {
      fill: ${LEVEL_COLOR.MEDIUM};
      stroke: none;
    }
    &.ZoneAnnotation--Low rect {
      fill: ${LEVEL_COLOR.LOW};
      stroke: none;
    }
  }
`;
