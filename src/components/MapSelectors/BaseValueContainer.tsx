import React from 'react';
import { components, ValueContainerProps } from 'react-select';
import SearchIcon from '@material-ui/icons/Search';

const ValueContainer = ({ children, ...props }: ValueContainerProps<any>) => {
  return (
    components.ValueContainer && (
      <components.ValueContainer {...props}>
        {!!children && <SearchIcon />}
        {children}
      </components.ValueContainer>
    )
  );
};

export default ValueContainer;
