/**
 * Not meant to be edited
 *
 * This is the base button for all button variations (internal/external links, hash links, non-link buttons, spans that look like buttons)
 *
 * Styles/variations are added in MainButtons.style.tsx
 */

import React from 'react';
import { EventAction, trackEvent } from 'components/Analytics';
import { BaseButtonProps } from './propTypes';
import LinkButton from './LinkButton';
import Button from './Button';
import FakeButton from './FakeButton';

const BaseButton: React.FC<BaseButtonProps> = props => {
  const isLink = props.href || props.to;
  const isButton = props.onClick && !isLink;
  const isFakeButton = !isLink && !isButton;

  if (isFakeButton) {
    return <FakeButton {...props} />;
  }

  const {
    trackingAction,
    trackingCategory,
    trackingLabel,
    ...otherProps
  } = props;

  const onClick = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const defaultAction = isButton ? EventAction.CLICK : EventAction.NAVIGATE;
    const action = trackingAction || defaultAction;
    trackEvent(trackingCategory, action, trackingLabel);
    props.onClick && props.onClick(ev);
  };

  if (isLink) {
    return <LinkButton {...otherProps} onClick={onClick} />;
  } else {
    return <Button {...otherProps} onClick={onClick} />;
  }
};

export default BaseButton;
