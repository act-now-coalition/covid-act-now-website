import styled from 'styled-components';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { COLOR_MAP } from 'common/colors';

export const Container = styled.div`
  border: solid 1px ${COLOR_MAP.GREY_1};
  border-radius: 4px;
`;

export const StyledTabs = styled(Tabs)`
  border-bottom: solid 1px ${COLOR_MAP.GREY_1};
`;

export const StyledTab = styled(Tab).attrs(props => ({
  disableRipple: true,
  disableFocusRipple: true,
}))`
  text-transform: none;

  .MuiTab-root {
    text-transform: none;
  }
`;

export const PanelContainer = styled.div`
  padding: 24px;
`;

export const PanelContent = styled.div``;
