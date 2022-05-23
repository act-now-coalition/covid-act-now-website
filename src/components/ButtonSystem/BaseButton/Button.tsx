/**
 * Used in BaseButton.tsx
 *
 * Button that does a non-navigational action (ie. open modal, email signup)
 *
 * Renders if there is an onClick but no 'to' or 'href' prop present
 */

import React from 'react';
import { assert } from '@actnowcoalition/assert';
import { BaseMuiButton } from './BaseButton.style';
import { StyledButtonProps } from './propTypes';

const Button: React.FC<StyledButtonProps> = ({ onClick, ...otherProps }) => {
  assert(onClick, 'Button needs an onClick');

  return <BaseMuiButton {...otherProps} onClick={onClick} />;
};

export default Button;
