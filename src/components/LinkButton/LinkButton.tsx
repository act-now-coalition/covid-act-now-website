import React, { ComponentProps, DetailedHTMLProps } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { assert } from 'common/utils';
import { BaseButton } from './LinkButton.style';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

type AnchorLinkType = DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

type StyledButtonProps = ComponentProps<typeof BaseButton>;

type ExternalLinkButtonProps = StyledButtonProps & AnchorLinkType;

type InternalLinkButtonProps = StyledButtonProps & LinkProps;

interface TrackingProps {
  trackingCategory: EventCategory;
  trackingAction?: EventAction;
  trackingLabel: string;
}

export type LinkButtonProps = InternalLinkButtonProps | ExternalLinkButtonProps;

const LinkButton: React.FC<LinkButtonProps & TrackingProps> = props => {
  assert(
    props.href || props.to,
    "LinkButton needs either 'to' or 'href' as props",
  );

  const isInternalLink = props.to;
  const { trackingAction, trackingCategory, trackingLabel } = props;

  const onClick = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const action =
      trackingAction || isInternalLink
        ? EventAction.NAVIGATE
        : EventAction.CLICK_LINK;
    if (trackingCategory && trackingLabel) {
      trackEvent(trackingCategory, action, trackingLabel);
    }
    props.onClick && props.onClick(ev);
  };

  if (isInternalLink) {
    return <BaseButton {...props} component={Link} onClick={onClick} />;
  } else {
    return (
      <BaseButton
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      />
    );
  }
};

export default LinkButton;
