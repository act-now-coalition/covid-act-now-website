import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import MuiTab from '@material-ui/core/Tab';
import MuiTabs from '@material-ui/core/Tabs';

export const Tabs = styled(MuiTabs)`
  .MuiTabs-flexContainer {
    align-items: flex-end;
  }
  .MuiTabs-indicator {
    background-color: ${COLOR_MAP.BLACK};
  }
  .MuiTab-root {
    min-width: fit-content;
  }
`;

export const Tab = styled(MuiTab)`
  line-height: 1;
  text-align: left;
  padding: 6px 0;
  margin-right: 1.5rem;
  opacity: 1;
  .MuiTab-wrapper {
    align-items: start;
  }
  &.Mui-selected {
    font-weight: 500;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
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

export const TabsWrapper = styled.div`
  border-bottom: 1px solid ${COLOR_MAP.GREY_3};
  margin-bottom: 2rem;
`;

export const InactiveTabWrapper = styled.div<{ activeTabIndex: number }>`
  ${Tab} {
    cursor: default;
  }
`;
