import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import palette from 'assets/theme/palette';
import { mobileBreakpoint } from 'assets/theme/sizes';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 64px;
  padding: 0 20px;

  @media (min-width: ${mobileBreakpoint}) {
    padding: 0 20px;
  }
`;

export const StyledAppBar = styled(AppBar)`
  box-shadow: none;
  border-bottom: 1px solid white;

  @media (min-width: 1350px) {
    border-bottom: 1px solid #e3e3e3;
  }
`;

export const Left = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  * {
    font-weight: 900;
    margin-right: 16px;
  }
  svg {
    width: 32px;
    height: 32px;
  }
`;

export const StyledDesktopMenu = styled(Tabs)`
  display: none;

  @media (min-width: ${mobileBreakpoint}) {
    display: flex;
    align-items: center;
  }
`;

export const StyledTabs = styled(Tabs)`
  min-height: 32px;
`;

export const StyledTab = styled(Tab)`
  min-width: 36px;
  min-height: 32px;
  margin-left: 15px;
  font-size: 1.125rem;
  font-weight: bold;
  letter-spacing: 0em;
  padding: 0;
  color: ${palette.black};
  opacity: 1;
  text-transform: none;

  &[aria-selected='true'] {
    color: ${palette.secondary.main};
  }

  @media (min-width: ${mobileBreakpoint}) {
    margin-left: 2rem;
    font-size: 1rem;
  }

  @media (min-width: 1350px) {
    height: 64px;
  }
`;

export const MenuTitle = styled.div`
  display: inline-block;
`;

export const StyledBurger = styled.button<{ open: boolean }>`
  position: relative;
  top: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 16px;
    height: 2px;
    background: ${({ open }) => (open ? '#0D0C1D' : '#000000')};
    position: relative;
    transform-origin: 1px;
    /* left: 4px; */

    :first-child {
      top: 2px;
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
      width: ${({ open }) => (open ? '19px' : '16px')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
      width: ${({ open }) => (open ? '19px' : '16px')};
      bottom: 2px;
    }
  }
`;

export const StyledMobileMenu = styled.nav`
  display: inherit;
  @media (min-width: ${mobileBreakpoint}) {
    display: none;
  }
`;

export const StyledMenu = styled.nav<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  background: #f2f2f2;
  border-top: 1px solid #e3e3e3;
  transform: ${({ open }) => (open ? 'translateY(64px)' : 'translateY(-100%)')};
  height: 100vh;
  text-align: left;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  a {
    cursor: pointer;
    font-size: 1rem;
    color: ${palette.black};
    text-decoration: none;
    font-weight: bold;
    padding: 2rem 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    background: white;

    &:hover,
    &:active {
      background: #f2f2f2;
    }

    display: flex;
    align-items: center;

    svg {
      margin-right: 1rem;
    }
  }
`;

export const Content = styled.div``;
