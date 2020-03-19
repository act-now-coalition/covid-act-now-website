import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { useHistory, Link } from 'react-router-dom';
import Logo from 'assets/images/logo';
import { Wrapper, Left, StyledTabs, StyledTab } from './AppBar.style';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const _AppBar = () => {
  const history = useHistory();

  const [panelIdx, setPanelIdx] = useState(2);

  const handleChange = (_, value) => {
    setPanelIdx(value);
  };

  const goTo = route => history.push(route);

  return (
    <AppBar position="sticky">
      <Wrapper>
        <Left>
          <Switch>
            <Route path="/" exact>
              <Logo onClick={() => goTo('/')} />
            </Route>
            <Route>
              <Link to="/">Back to map</Link>
            </Route>
          </Switch>
          <Typography
            variant="button"
            component={Link}
            to="/"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            covid act now
          </Typography>
        </Left>
        {/* <StyledTabs value={panelIdx} onChange={handleChange}>
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
        </StyledTabs> */}
      </Wrapper>
    </AppBar>
  );
};

export default _AppBar;
