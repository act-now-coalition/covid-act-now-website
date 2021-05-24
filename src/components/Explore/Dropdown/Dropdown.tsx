import React, { useState } from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Menu,
  MenuButton,
  MenuLabel,
  ItemLabel,
  ButtonCopy,
  MenuItem,
} from './Dropdown.style';

const Dropdown: React.FC<{ menuLabel: string }> = ({ menuLabel }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <MenuButton
        aria-controls="menu-label" // edit this
        aria-haspopup="true"
        disableRipple
        onClick={handleClick}
        endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        $open={open}
      >
        <ButtonCopy>
          <MenuLabel>{menuLabel}</MenuLabel>
          <ItemLabel>Daily new cases (per 100k)</ItemLabel>
        </ButtonCopy>
      </MenuButton>
      <Menu
        id="menu-label" // edit this
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        onClose={handleClose}
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem>Daily new cases (per 100k)</MenuItem>
        <MenuItem>
          Percent vaccinated vaccinated vaccinated (completed)
        </MenuItem>
        <MenuItem>Deaths</MenuItem>
      </Menu>
    </>
  );
};

export default Dropdown;
