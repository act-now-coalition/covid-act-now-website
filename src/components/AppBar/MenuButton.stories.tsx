import React from 'react';
import MenuButton from './MenuButton';
import MenuIcon from '@material-ui/icons/Menu';

export default {
  title: 'Building Blocks/Buttons',
  component: MenuButton,
};

export const HamburgerMenu = () => (
  <MenuButton endIcon={<MenuIcon />}>Menu</MenuButton>
);
