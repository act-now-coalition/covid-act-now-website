import React, { useState } from 'react';
import { Menu, MenuItem } from './Dropdown.style';
import MenuButton from './MenuButton';

const Dropdown: React.FC<{
  menuLabel: string;
  itemLabels: string[];
  onSelect: (itemIndex: number) => void;
  defaultSelectionLabel: string;
}> = ({ menuLabel, itemLabels, onSelect, defaultSelectionLabel }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [buttonLabel, setButtonLabel] = useState(defaultSelectionLabel);

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
        onClick={handleClick}
        open={open}
        menuLabel={menuLabel}
        buttonLabel={buttonLabel}
      />
      <Menu
        id="menu-label" // edit this to be more descriptive
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
        {itemLabels.map((label: string, i: number) => {
          return (
            <MenuItem
              onClick={() => {
                onSelect(i);
                handleClose();
                setButtonLabel(label);
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
