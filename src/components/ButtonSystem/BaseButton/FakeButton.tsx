/**
 * Used in BaseButton.tsx
 *
 * We sometimes place our text buttons inside of larger buttons
 * (ex: 'Learn more' inside each clickable card on the case studies landing page)
 *
 * In this case, we render the button as a span so that it doesn't
 * render as a functional button (a button within a button is not accessible)
 */

import React from 'react';
import { BaseMuiButton } from './BaseButton.style';
import { StyledButtonProps } from './propTypes';

const FakeButton: React.FC<StyledButtonProps> = props => {
  return <BaseMuiButton as="span" style={{ cursor: 'default' }} {...props} />;
};

export default FakeButton;
