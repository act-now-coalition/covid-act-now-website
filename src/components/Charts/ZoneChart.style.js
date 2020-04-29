import styled from 'styled-components';
import palette from '../../assets/theme/palette';
import { COLOR_ZONE } from '../../enums/zones';

export const ZoneChartWrapper = styled.div`
  margin: 24px;

  .ZoneChart__Line {
    stroke-width: 4px;
  }

  .ZoneChart__AreaRange path {
    stroke-width: 0;
    stroke: none;
  }

  .ZoneAnnotation--CurrentValue {
    text {
      fill: ${palette.primary.contrastText};
    }
    &.ZoneAnnotation rect {
      fill-opacity: 0;
      stroke: none;
    }
  }

  .ZoneAnnotation rect {
    fill: ${palette.white};
    stroke: ${palette.black};
    stroke-opacity: 0.12;
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
