import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import MuiTab from '@material-ui/core/Tab';
import MuiTabs from '@material-ui/core/Tabs';

export const Tabs = styled(MuiTabs)`
  .MuiTabs-indicator {
    background-color: ${COLOR_MAP.BLACK};
  }
`;

export const Tab = styled(MuiTab)`
  line-height: 1;
  text-align: left;
  padding: 6px 0;
  margin-right: 1.5rem;
  &.Mui-selected {
    font-weight: 500;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 4rem;
  max-width: 10.5rem;
  justify-content: space-between;
`;

export const TabTitle = styled.div`
  text-transform: uppercase;
  font-size: 0.8rem;
  line-height: 1;
  color: ${COLOR_MAP.GREY_4};
  margin-bottom: 0.5rem;
`;

export const TabContent = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

export const MetricSubLabel = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
  color: ${COLOR_MAP.GREY_4};
  line-height: 1;

  @media (min-width: ${materialSMBreakpoint}) {
    color: ${COLOR_MAP.GREY_3};
    padding: 0.5rem 0 0 0.5rem;
  }
`;
