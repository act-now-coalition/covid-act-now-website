import React, { useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import Logo from 'assets/images/logo';
import { Wrapper, Left, StyledTabs, StyledTab } from './AppBar.style';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const _AppBar = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const panels = ['/', '/faq'];
  const [panelIdx, setPanelIdx] = useState(panels.indexOf(pathname) || 0);

  const handleChange = (_, value) => {
    setPanelIdx(value);
  };

  const goTo = route => history.push(route);

  return (
    <AppBar position="sticky">
      <Wrapper>
        <Left>
          {pathname.includes('state') ? (
            <ArrowBack onClick={() => goTo('/')} />
          ) : (
            <Logo onClick={() => goTo('/')} />
          )}
          <Typography
            variant="button"
            component={Link}
            to="/"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            covid act now
          </Typography>
        </Left>
        <StyledTabs value={panelIdx} onChange={handleChange}>
          <StyledTab label="Data" disableRipple onClick={() => goTo('/')} />
          <StyledTab label="FAQ" disableRipple onClick={() => goTo('/faq')} />
          {/* <StyledTab
            label="Endorsements"
            disableRipple
            onClick={() => goTo('/endorsements')}
          /> */}
          {/* <StyledTab
            label="Donate"
            disableRipple
            onClick={() => goTo('/donate')}
          /> */}
        </StyledTabs>
      </Wrapper>
    </AppBar>
  );
};

export default _AppBar;
