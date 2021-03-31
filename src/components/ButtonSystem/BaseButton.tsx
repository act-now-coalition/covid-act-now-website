/**
 * Not meant to be edited
 *
 * This is the base button for all button variations (internal/external links, hash links, non-link buttons)
 *
 * Styles/variations are added in MainButtons.style.tsx
 */

import React, { ComponentProps, DetailedHTMLProps } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { HashLink, HashLinkProps } from 'react-router-hash-link';
import { assert } from 'common/utils';
import { BaseMuiButton } from './BaseButton.style';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

type AnchorLinkType = DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

type StyledButtonProps = ComponentProps<typeof BaseMuiButton>;

type LinkProps = AnchorLinkType | RouterLinkProps | HashLinkProps;

type LinkButtonProps = LinkProps & StyledButtonProps;

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

const Button: React.FC<StyledButtonProps> = ({ onClick, ...otherProps }) => {
  assert(onClick, 'Button needs an onClick');

  return <BaseMuiButton {...otherProps} onClick={onClick} />;
};

interface TrackingProps {
  trackingCategory: EventCategory;
  trackingAction?: EventAction;
  trackingLabel: string;
}

type BaseButtonProps = TrackingProps & (LinkButtonProps | StyledButtonProps);

const BaseButton: React.FC<BaseButtonProps> = props => {
  const isLink = props.href || props.to;
  const isButton = props.onClick && !isLink;

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
