import React, { useState }               from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { ArrowBack }                     from '@material-ui/icons';
import AppBar                            from '@material-ui/core/AppBar';
import Typography                        from '@material-ui/core/Typography';

import Logo                              from 'assets/images/logo';
import MobileMenu from'./MobileMenu';
import Burger from'./Burger';
import {
  Wrapper,
  Left,
  StyledTabs,
  StyledTab,
  MobileMenuTitle,
  MenuTitle,
  StyledMobileMenu,
} from './AppBar.style';
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  WhatsappShareButton,
} from "react-share";

const _AppBar = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const panels = ['/', '/faq', '/endorsements'];
  const [panelIdx, setPanelIdx] = useState(panels.indexOf(pathname) || 0);
  const [open, setOpen] = useState(false);

  const handleChange = (_, value) => {
    setPanelIdx(value);
  };

  const goTo = route => {
    setOpen(false);

    history.push(route)
  };

  return (
    <AppBar position="sticky">
      <Wrapper>
        <Left>
          {pathname.includes('state') ? (
            <ArrowBack onClick={() => goTo('/')} />
          ) : (
            <Logo onClick={() => goTo('/')} />
          )}
          <MenuTitle>
            <Typography
              variant="button"
              component={Link}
              onClick={() => goTo('/')}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              COVID ACT NOW
            </Typography>
          </MenuTitle>
        </Left>
        <StyledTabs value={panelIdx} onChange={handleChange}>
          <TwitterShareButton
            url="https://covidactnow.org"
            style={{ alignItems: 'center', display: 'flex' }}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <StyledTab label="Data" disableRipple onClick={() => goTo('/')} />
          <StyledTab label="FAQ" disableRipple onClick={() => goTo('/faq')} />
          <StyledTab
            label="Endorsements"
            disableRipple
            onClick={() => goTo('/endorsements')}
          />
        </StyledTabs>
        <StyledMobileMenu>
            <TwitterShareButton
              url="https://covidactnow.org"
              style={{ alignItems: 'center', display: 'flex' }}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
           <Burger open={open} setOpen={setOpen} />
           <MobileMenu open={open} setOpen={setOpen} goTo={goTo} />
        </StyledMobileMenu>
      </Wrapper>
    </AppBar>
  );
};

export default _AppBar;
