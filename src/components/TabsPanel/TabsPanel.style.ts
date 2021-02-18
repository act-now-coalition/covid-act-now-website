import styled from 'styled-components';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { COLOR_MAP } from 'common/colors';

export const Container = styled.div`
  border: solid 1px ${COLOR_MAP.GREY_1};
  border-radius: 4px;
`;

export const StyledTabs = styled(Tabs)<{ $indicatorColor: string }>`
  border-bottom: solid 1px ${COLOR_MAP.GREY_1};
  .MuiTabs-indicator {
    background-color: ${props => props.$indicatorColor};
  }
`;

export const StyledTab = styled(Tab).attrs(props => ({
  disableRipple: true,
  disableFocusRipple: true,
}))`
  text-transform: none;

  &.Mui-focusVisible {
    outline: rgb(0, 95, 204) 1px auto;
  }
`;

export const PanelContainer = styled.div`
  padding: 24px;
`;

export const PanelContent = styled.div``;
