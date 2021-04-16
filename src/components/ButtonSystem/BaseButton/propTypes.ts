import React, { ComponentProps, DetailedHTMLProps } from 'react';
import { LinkProps as RouterLinkProps } from 'react-router-dom';
import { HashLinkProps } from 'react-router-hash-link';
import { BaseMuiButton } from './BaseButton.style';
import { EventAction, EventCategory } from 'components/Analytics';

export type AnchorLinkType = DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export type StyledButtonProps = ComponentProps<typeof BaseMuiButton>;

export type LinkProps = AnchorLinkType | RouterLinkProps | HashLinkProps;

export type LinkButtonProps = LinkProps & StyledButtonProps;

export interface TrackingProps {
  trackingCategory: EventCategory;
  trackingAction?: EventAction;
  trackingLabel: string;
}

export type BaseButtonProps = TrackingProps &
  (LinkButtonProps | StyledButtonProps);
