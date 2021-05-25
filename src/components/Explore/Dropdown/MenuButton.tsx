import React from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, MenuLabel, ItemLabel, ButtonCopy } from './Dropdown.style';

const MenuButton: React.FC<{
  onClick: any;
  menuLabel: string;
  buttonLabel: string;
  open?: boolean;
}> = ({ onClick, open, menuLabel, buttonLabel }) => {
  return (
    <Button
      aria-controls="menu-label" // edit this to be more descriptive
      aria-haspopup="true"
      disableRipple
      onClick={onClick}
      endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      $open={open}
    >
      <ButtonCopy>
        <MenuLabel>{menuLabel}</MenuLabel>
        <ItemLabel>{buttonLabel}</ItemLabel>
      </ButtonCopy>
    </Button>
  );
};

export default MenuButton;
