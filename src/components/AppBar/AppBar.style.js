import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import palette from 'assets/theme/palette';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 64px;
  padding: 0 40px;
  * {
    font-size: 16px;
  }
`;

export const Left = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  * {
    font-weight: 900;
    margin-right: 16px;
  }
  svg {
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
`;

export const StyledTabs = styled(Tabs)`
  /* background-color: blue; */
  /* max-width: 300px; */
`;

export const StyledTab = styled(Tab)`
  min-width: 36px;
  height: 64px;
  margin-left: 28px;
  padding: 0;

  &:focus {
    color: ${palette.secondary.main};
    /* border-bottom: 4px solid ${palette.secondary.main}; */
  }
`;

export const Content = styled.div``;
