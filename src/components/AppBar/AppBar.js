import React, { useState } from 'react';
import _AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from 'react-router-dom';
import Header from 'components/Header/Header';

import Logo from 'assets/images/logo';
import { 
  Wrapper,
  Left,
  StyledTabs,
  StyledTab,
  MobileMenuTitle,
  MenuTitle,
} from './AppBar.style';

const AppBar = () => {
  const history = useHistory();

  const [panelIdx, setPanelIdx] = useState(2);

  const handleChange = (_, value) => {
    setPanelIdx(value);
  };

  const matches = useMediaQuery('(min-width:600px)');

  const goTo = route => history.push(route);

  return (
    <_AppBar position="sticky">
      <Wrapper>
        <Left>
          <Logo />
            <MenuTitle>
              <Typography variant="button" component="p">
                covid bay area
              </Typography>
            </MenuTitle>
        </Left>
        <StyledTabs value={panelIdx} onChange={handleChange}>
          <StyledTab label="FAQ" disableRipple onClick={() => goTo('/faq')} />
          <StyledTab
            label="About"
            disableRipple
            onClick={() => goTo('/about')}
          />
          <StyledTab label="Data" disableRipple onClick={() => goTo('/data')} />
          <StyledTab
            label="Donate"
            disableRipple
            onClick={() => goTo('/donate')}
          />
        </StyledTabs>
      </Wrapper>
      <MobileMenuTitle>
          <Typography variant="button" component="p">
            COVID BAY AREA
          </Typography>
      </MobileMenuTitle>
      <Header />
    </_AppBar>
  );
};

export default AppBar;
