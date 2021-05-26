import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Menu, MenuItem } from './Dropdown.style';
import MenuButton from './MenuButton';
import { LockBodyScroll } from 'components/Dialog';

const Dropdown: React.FC<{
  menuLabel: string;
  itemLabels: string[];
  onSelect: (itemIndex: number) => void;
  defaultSelectionLabel: string;
  maxWidth: number;
}> = ({ menuLabel, itemLabels, onSelect, defaultSelectionLabel, maxWidth }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [buttonLabel, setButtonLabel] = useState(defaultSelectionLabel);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const menuId = uuidv4();

  return (
    <>
      <MenuButton
        onClick={handleClick}
        open={open}
        menuLabel={menuLabel}
        buttonLabel={buttonLabel}
        maxWidth={maxWidth}
        ariaControlsId={menuId}
      />
      {open && <LockBodyScroll />}
      <Menu
        id={menuId}
        open={Boolean(anchorEl)}
        $maxWidth={maxWidth}
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
        {itemLabels.map((label: string, i: number) => {
          return (
            <MenuItem
              onClick={() => {
                onSelect(i);
                setButtonLabel(label);
                handleClose();
              }}
            >
              {label}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default Dropdown;
