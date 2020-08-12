import styled from 'styled-components';
import MuiTab from '@material-ui/core/Tab';
import MuiTabs from '@material-ui/core/Tabs';
import theme from 'assets/theme';

/** Gets the chart palette based on the current theme. */
function palette(props: any) {
  return props.theme.palette.chart;
}

// TODO(pablo): Get from theme
const lightBlue = '#00BFEA';

export const Container = styled.div`
  /* TODO(pablo): Get from theme */
  margin-bottom: 20px;
`;

// Header
export const Header = styled.div`
  /* TODO(pablo): Use spacing from the theme */
  margin-bottom: 40px;
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
    /* TODO(pablo): Get from theme */
    background-color: ${lightBlue};
  }
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

export const ChartContainer = styled.div`
  /* TODO (pablo): Get from theme */
  margin-top: 30px;
`;

// Chart
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
