import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MuiTab from '@material-ui/core/Tab';
import MuiTabs from '@material-ui/core/Tabs';
import theme from 'assets/theme';
import colorPalette from 'assets/theme/palette';
import { charts } from 'components/Charts/Charts.style';

/** Gets the chart palette based on the current theme. */
function palette(props: any) {
  return props.theme.palette.chart;
}

export const Container = styled.div`
  margin: ${theme.spacing(4)}px 0;
`;

export const Header = styled.div`
  margin-bottom: ${theme.spacing(2)}px;
`;

export const Heading = styled(Typography)`
  margin-top: 0;
  margin-bottom: 0;
`;

export const ShareBlock = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Subtitle = styled.div`
  /* TODO(pablo): Move subtitle to the theme, use typography */
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #828282;
`;

export const Tabs = styled(MuiTabs)`
  margin-top: ${theme.spacing(2)}px;
  .MuiTabs-indicator {
    background-color: ${colorPalette.lightBlue};
  }

  border-bottom: solid 1px ${theme.palette.grey[300]};
`;

export const Tab = styled(MuiTab)`
  /* TODO(pablo): Use Typography */
  font-family: Roboto;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  text-transform: none;
  color: ${theme.palette.text.secondary};

  &.Mui-selected {
    font-weight: 500;
    color: ${theme.palette.text.primary};
  }
`;

// CHART CONTROLS
export const ChartControlsContainer = styled.div`
  margin: ${theme.spacing(2)}px auto;
`;

export const LegendContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const LegendItem = styled(Box)`
  flex-shrink: 1;
  flex-grow: 0;
  margin-right: ${theme.spacing(1)}px;
  &:last-child {
    margin-right: 0;
  }
`;

export const LegendItemMarker = styled.span`
  padding: 0 ${theme.spacing(1)}px;
`;

export const LegendItemLabel = styled.span`
  /* TODO(pablo): Get from theme */
  font-family: Source Code Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
`;

export const ChartContainer = styled.div`
  margin-top: ${theme.spacing(4)}px;
`;

export const PositionRelative = styled.div`
  position: relative;
`;

export const MainSeriesLine = styled.g`
  line,
  path {
    fill: none;
    stroke: ${props =>
      props.stroke ? props.stroke : palette(props).foreground};
    stroke-linecap: round;
    stroke-width: 3px;
  }
`;

export const BarsSeries = styled.g<{
  barOpacity?: number;
  barOpacityHover?: number;
}>`
  rect {
    fill: ${props => (props.stroke ? props.stroke : palette(props).foreground)};
    fill-opacity: ${({ barOpacity, barOpacityHover }) =>
      !barOpacity && !barOpacityHover
        ? '0.2'
        : barOpacity
        ? barOpacity
        : barOpacityHover};
  }
`;

export const GridLines = styled.g`
  line {
    stroke: ${theme.palette.grey[300]};
    stroke-width: 1px;
    stroke-dasharray: 5, 5;
  }
`;

export const TodayLabel = styled.g`
  text {
    font-family: ${charts.fontFamily};
    font-weight: 500;
    font-size: 12px;
    fill: #4f4f4f;
    text-anchor: middle;
  }
`;

export const DateMarker = styled.div`
  position: absolute;
  bottom: 0;
  transform: translate(-50%, 100%);
  /* TODO(pablo): Use theme */
  background-color: white;
  width: 180px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  padding: ${theme.spacing(1) / 2}px ${theme.spacing(2)}px;

  text-align: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 140%;
`;

export const DotMarker = styled.circle`
  fill: black;
  stroke: white;
  stroke-width: 4px;
`;

export const TooltipSubtitle = styled.div`
  text-transform: uppercase;

  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #bdbdbd;
`;

export const TooltipMetric = styled.div`
  font-family: Source Code Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 19px;
  color: #ffffff;
`;

export const TooltipLocation = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  color: #ffffff;
`;
