/**
 * Used in BaseButton.tsx
 *
 * Button that is a link
 *
 * Renders if there is a 'to' or 'href' prop present
 */

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { assert } from '@actnowcoalition/assert';
import { BaseMuiButton } from './BaseButton.style';
import { LinkButtonProps } from './propTypes';

const LinkButton: React.FC<LinkButtonProps> = props => {
  const isLink = props.href || props.to;
  assert(isLink, "LinkButton needs either 'to' or 'href' as props");

  const isInternalLink = props.to;

  const isHashLink = props.to && props.to.includes('#');

  const { onClick, ...otherProps } = props;

  if (isHashLink) {
    return (
      <BaseMuiButton {...otherProps} component={HashLink} onClick={onClick} />
    );
  } else if (isInternalLink) {
    return (
      <BaseMuiButton {...otherProps} component={RouterLink} onClick={onClick} />
    );
  } else {
    return (
      <BaseMuiButton
        {...otherProps}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      />
    );
  }
};

export default LinkButton;
