import React, { useState } from 'react';
import _AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

import Logo from 'assets/images/logo';
import { Wrapper, Left, StyledTabs, StyledTab } from './AppBar.style';

const AppBar = () => {
  const history = useHistory();

  const [panelIdx, setPanelIdx] = useState(2);

  const handleChange = (_, value) => {
    setPanelIdx(value);
  };

  const goTo = route => history.push(route);

  return (
    <_AppBar position="static">
      <Wrapper>
        <Left>
          <Logo />
          <Typography variant="button" component="p">
            covid bay area
          </Typography>
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
    </_AppBar>
  );
};

export default AppBar;
