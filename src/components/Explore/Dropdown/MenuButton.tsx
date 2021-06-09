import React from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  MainButton,
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
  ariaControlsId: string;
  maxWidth?: number;
}> = ({ onClick, open, menuLabel, buttonLabel, ariaControlsId, maxWidth }) => {
  return (
    <MainButton
      aria-controls={ariaControlsId}
      aria-haspopup="true"
      onClick={onClick}
      $open={open}
      $maxWidth={maxWidth}
    >
      <ButtonContent>
        <Column>
          <MenuLabel>{menuLabel}</MenuLabel>
          <ItemLabel>{buttonLabel}</ItemLabel>
        </Column>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ButtonContent>
    </MainButton>
  );
};

export default MenuButton;
