import styled from 'styled-components';
import MuiTab from '@material-ui/core/Tab';
import MuiTabs from '@material-ui/core/Tabs';
import theme from 'assets/theme';

// TODO(pablo): Get from theme
const lightBlue = '#00BFEA';

export const Container = styled.div`
  /* TODO(pablo): Get from theme */
  margin-bottom: 20px;
`;

export const Placeholder = styled.div`
  margin: 4px;
  padding: 4px;
  background-color: #f2f2f2;
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
