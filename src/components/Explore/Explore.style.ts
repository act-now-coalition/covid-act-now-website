import styled from 'styled-components';
import Box from '@material-ui/core/Box';

import MuiTab from '@material-ui/core/Tab';
import MuiTabs from '@material-ui/core/Tabs';
import theme from 'assets/theme';

/** Gets the chart palette based on the current theme. */
function palette(props: any) {
  return props.theme.palette.chart;
}

const lightBlue = '#00BFEA';

export const Container = styled.div`
  margin-bottom: ${theme.spacing(4)}px;
`;

// Header
export const Header = styled.div`
  margin-bottom: ${theme.spacing(4) + theme.spacing(2)}px;
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
  .MuiTabs-indicator {
    background-color: ${lightBlue};
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
  margin: ${theme.spacing(1)}px 0;
`;

export const LegendContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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

export const BarsSeries = styled.g`
  rect {
    fill: ${props => (props.stroke ? props.stroke : palette(props).foreground)};
    fill-opacity: 0.2;
  }
`;

export const GridLines = styled.g`
  line {
    stroke: ${theme.palette.grey[300]};
    stroke-width: 1px;
    stroke-dasharray: 5, 5;
  }
`;
