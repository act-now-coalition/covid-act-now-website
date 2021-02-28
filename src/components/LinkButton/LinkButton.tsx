import React, { ComponentProps, DetailedHTMLProps } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'common/utils/router';
import { HashLink, HashLinkProps } from 'common/utils/router';
import { assert } from 'common/utils';
import { BaseButton } from './LinkButton.style';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

type AnchorLinkType = DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

type StyledButtonProps = ComponentProps<typeof BaseButton>;

type LinkProps = AnchorLinkType | RouterLinkProps | HashLinkProps;

interface TrackingProps {
  trackingCategory: EventCategory;
  trackingAction?: EventAction;
  trackingLabel: string;
}

export type LinkButtonProps = LinkProps & TrackingProps & StyledButtonProps;

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

export default LinkButton;
