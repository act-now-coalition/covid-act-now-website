import React from 'react';
import { StyledButton } from './MenuButton.style';
import MenuIcon from '@material-ui/icons/Menu';

type MenuButtonProps = React.ComponentProps<typeof StyledButton>;

const MenuButton: React.FC = () => {
  return <StyledButton endIcon={<MenuIcon />}>Menu</StyledButton>;
};

export default MenuButton;
