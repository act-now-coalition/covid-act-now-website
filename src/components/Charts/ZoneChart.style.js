import styled from 'styled-components';
import palette from '../../assets/theme/palette';
import { COLOR_ZONE } from '../../enums/zones';

const chartFontFamily = "'Source Code Pro', 'Roboto', sans-serif";

export const ZoneChartWrapper = styled.div`
  @media (min-width: 996px) {
    margin-left: -3rem;
  }

  .highcharts-axis-labels.highcharts-yaxis-labels {
    span {
      font-family: ${chartFontFamily} !important;
    }
  }

  .highcharts-axis-labels.highcharts-xaxis-labels {
    span {
      font-family: ${chartFontFamily} !important;
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
      fill: ${COLOR_ZONE.HIGH};
      stroke: none;
    }
    &.ZoneAnnotation--Medium rect {
      fill: ${COLOR_ZONE.MEDIUM};
      stroke: none;
    }
    &.ZoneAnnotation--Low rect {
      fill: ${COLOR_ZONE.LOW};
      stroke: none;
    }
  }
`;
