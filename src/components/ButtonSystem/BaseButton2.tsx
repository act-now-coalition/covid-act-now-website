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
// import {LinkButton} from 'components/LinkButton/LinkButton';

interface TrackingProps {
  trackingCategory: EventCategory;
  trackingAction?: EventAction;
  trackingLabel: string;
}

type MuiButtonProps = ComponentProps<typeof BaseMuiButton>;

type AnchorLinkType = DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

type LinkProps = AnchorLinkType | RouterLinkProps | HashLinkProps;

type LinkButtonProps = LinkProps & TrackingProps & MuiButtonProps;

type BaseButtonProps = LinkButtonProps | MuiButtonProps;

const LinkButton: React.FC<LinkButtonProps> = props => {
  const isLink = props.href || props.to;
  assert(isLink, "LinkButton needs either 'to' or 'href' as props");

  const isInternalLink = props.to;
  const isHashLink = props.to && props.to.includes('#');

  const {
    trackingAction,
    trackingCategory,
    trackingLabel,
    ...otherProps
  } = props;

  const onClick = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const defaultAction = isInternalLink
      ? EventAction.NAVIGATE
      : EventAction.CLICK_LINK;
    const action = trackingAction || defaultAction;
    trackEvent(trackingCategory, action, trackingLabel);
    props.onClick && props.onClick(ev);
  };

  if (isHashLink) {
    return (
      <BaseButton {...otherProps} component={HashLink} onClick={onClick} />
    );
  } else if (isInternalLink) {
    return (
      <BaseButton {...otherProps} component={RouterLink} onClick={onClick} />
    );
  } else {
    return (
      <BaseButton
        {...otherProps}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      />
    );
  }
};

const Button: React.FC<MuiButtonProps> = props => {
  const hasOnClick = props.onClick;
  assert(hasOnClick, 'Button needs an onClick');

  const {
    trackingAction,
    trackingCategory,
    trackingLabel,
    ...otherProps
  } = props;

  const onClick = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const defaultAction = EventAction.CLICK;
    const action = trackingAction || defaultAction;
    trackEvent(trackingCategory, action, trackingLabel);
    props.onClick && props.onClick(ev);
  };
  return <BaseMuiButton {...otherProps} onClick={onClick} />;
};

const BaseButton: React.FC<BaseButtonProps> = props => {
  const isLink = props.href || props.to;
  const isButton = props.onClick && !isLink;
  assert(
    isLink || isButton,
    "Button needs either a redirect ('href' or 'to' if triggering navigation) or an onClick (if triggering a non-redirect action)",
  );

  if (isLink) {
    return <LinkButton {...props} />;
  } else {
    return <Button {...props} />;
  }
};

export default BaseButton;
