import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint, smallPhoneBreakpoint } from 'assets/theme/sizes';
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

export const TabTitle = styled.div`
  text-transform: uppercase;
  font-size: 0.8rem;
  line-height: 1.2;
  color: ${COLOR_MAP.GREY_4};
  margin-bottom: 0.5rem;
`;

export const MetricSubLabel = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
  color: ${COLOR_MAP.GREY_4};

  @media (min-width: ${materialSMBreakpoint}) {
    padding: 0.5rem 0 0 0.5rem;
  }
`;

export const Tab = styled(MuiTab).attrs(props => ({
  disableRipple: true,
  disableFocusRipple: true,
}))`
  line-height: 1;
  text-align: left;
  max-width: 600px;
  padding: 6px 0;
  margin-right: 1.5rem;
  opacity: 1;
  .MuiTab-wrapper {
    align-items: start;
  }
  &.Mui-selected {
    ${TabTitle},${MetricSubLabel}{
      color: black;
    }
  }
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80px;
  justify-content: space-between;

  @media (min-width: ${smallPhoneBreakpoint}) {
    width: 90px;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    width: fit-content;
  }
`;

export const TabContent = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

export const TabsWrapper = styled.div`
  border-bottom: 1px solid ${COLOR_MAP.GREY_3};
  margin-bottom: 2rem;
`;

export const InactiveTabWrapper = styled.div`
  ${Tab} {
    cursor: default; // (Chelsi)-this isn't the *most* accessible
  }

  ${TabTitle} {
    color: ${COLOR_MAP.GREY_4};
  }
`;

export const VaccinationsTabsWrapper = styled(InactiveTabWrapper)`
  display: flex;

  ${TabContainer} {
    margin-right: 1.5rem;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;
