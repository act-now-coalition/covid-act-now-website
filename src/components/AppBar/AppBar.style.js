import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import palette from 'assets/theme/palette';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 64px;
  padding: 0 20px;

  @media(min-width: 600px) {
    padding: 0 40px;
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

export const StyledDesktopMenu = styled(Tabs)`
  display: none;

  @media(min-width: 600px) {
     display: inline-block;
  }
`;

export const StyledTabs = styled(Tabs)`
`;

export const StyledTab = styled(Tab)`
  min-width: 36px;
  height: 64px;
  margin-left: 15px;
  font-size: 15px;
  padding: 0;

  &:focus {
    color: ${palette.secondary.main};
    /* border-bottom: 4px solid ${palette.secondary.main}; */
  }

  @media(min-width: 600px) {
    margin-left: 28px;
    font-size: 16px;
  }
`;


export const MenuTitle = styled.div`
  display: inline-block;
`;

export const StyledBurger = styled.button`
  position: relative;
  top: 15px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ open }) => open ? '#0D0C1D' : '#000000'};
    border-radius: 10px;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

export const StyledMobileMenu = styled.nav`
  display: inherit;
  @media(min-width: 600px) {
    display: none;
  }
`;

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  background: white;
  border-top: 1px solid #e3e3e3;
  transform: ${({ open }) => open ? 'translateY(64px)' : 'translateY(-100%)'};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  a {
    cursor: pointer;
    font-size: 2rem;
    padding: 1rem 0;
    font-weight: bold;
    color: #0D0C1D;
    text-decoration: none;
  }
`;

export const Content = styled.div``;
