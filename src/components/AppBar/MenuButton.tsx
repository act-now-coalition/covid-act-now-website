import React from 'react';
import { StyledButton } from './MenuButton.style';

type MenuButtonProps = React.ComponentProps<typeof StyledButton>;

const MenuButton: React.FC<MenuButtonProps> = props => {
  return <StyledButton {...props} />;
};

export default MenuButton;
