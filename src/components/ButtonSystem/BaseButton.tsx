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

interface TrackingProps {
  trackingCategory: EventCategory;
  trackingAction?: EventAction;
  trackingLabel: string;
}

export type LinkButtonProps = LinkProps & TrackingProps & StyledButtonProps;

const BaseButton: React.FC<LinkButtonProps> = props => {
  const isLink = props.href || props.to;
  const isNonLinkButton = props.onClick && !isLink;
  assert(
    isLink || isNonLinkButton,
    "Button needs either a redirect ('href' or 'to' if triggering navigation) or an onClick (if triggering a non-redirect action)",
  );

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

  if (isNonLinkButton) {
    return <BaseMuiButton {...otherProps} onClick={onClick} />;
  } else if (isHashLink) {
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

export default BaseButton;
