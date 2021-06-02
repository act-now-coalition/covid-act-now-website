import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ListButton, ListContainer, DropdownWrapper } from './Dropdown.style';
import MenuButton from './MenuButton';
import { ClickAwayListener } from '@material-ui/core';

const Dropdown: React.FC<{
  menuLabel: string;
  itemLabels: string[];
  onSelect: (itemIndex: number) => void;
  defaultSelectionLabel: string;
  maxWidth: number;
}> = ({ menuLabel, itemLabels, onSelect, defaultSelectionLabel, maxWidth }) => {
  const [open, setOpen] = useState(false);
  const [buttonLabel, setButtonLabel] = useState(defaultSelectionLabel);

  const handleClick = (event: any) => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const menuId = uuidv4();

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <DropdownWrapper $maxWidth={maxWidth}>
        <MenuButton
          onClick={handleClick}
          open={open}
          menuLabel={menuLabel}
          buttonLabel={buttonLabel}
          ariaControlsId={menuId}
        />
        <ListContainer open={open} $maxWidth={maxWidth}>
          {itemLabels.map((label: string, i: number) => {
            return (
              <ListButton
                key={`Menu item: ${label}`}
                $maxWidth={maxWidth}
                onClick={() => {
                  onSelect(i);
                  setButtonLabel(label);
                  handleClose();
                }}
              >
                {label}
              </ListButton>
            );
          })}
        </ListContainer>
      </DropdownWrapper>
    </ClickAwayListener>
  );
};

export default Dropdown;
