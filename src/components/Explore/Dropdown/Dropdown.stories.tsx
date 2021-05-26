import React from 'react';
import Dropdown from './Dropdown';

export default {
  title: 'Location page redesign/Explore',
  component: Dropdown,
};

export const DropdownMenu = () => {
  const props = {
    menuLabel: 'Menu label',
    itemLabels: ['item 1', 'item 2', 'item 3', 'item 4'],
    onSelect: () => {},
    defaultSelectionLabel: 'Default selection',
    maxWidth: 300,
  };
  return <Dropdown {...props} />;
};
