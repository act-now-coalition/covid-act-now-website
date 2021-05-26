import React from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Button,
  MenuLabel,
  ItemLabel,
  ButtonContent,
  Column,
} from './Dropdown.style';

const MenuButton: React.FC<{
  onClick: any;
  menuLabel: string;
  buttonLabel: string;
  open?: boolean;
  maxWidth: number;
}> = ({ onClick, open, menuLabel, buttonLabel, maxWidth }) => {
  return (
    <Button
      aria-controls="menu-label" // edit this to be more descriptive
      aria-haspopup="true"
      disableRipple
      onClick={onClick}
      $open={open}
      maxWidth={maxWidth}
    >
      <ButtonContent>
        <Column>
          <MenuLabel>{menuLabel}</MenuLabel>
          <ItemLabel>{buttonLabel}</ItemLabel>
        </Column>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ButtonContent>
    </Button>
  );
};

export default MenuButton;
