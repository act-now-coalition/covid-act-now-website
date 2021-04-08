import React from 'react';
import {
  DonateButtonWrapper,
  StyledDonateButton,
  StyledDonateButtonHeart,
} from './DonateButton.style';
import { EventAction, EventCategory } from 'components/Analytics';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { LinkProps } from 'components/LinkButton';

const trackingProps = {
  trackingCategory: EventCategory.DONATE,
  trackingAction: EventAction.CLICK,
  trackingLabel: 'AppBar donate button',
};

export const DonateButton = () => (
  <DonateButtonWrapper>
    <StyledDonateButton to="/donate" {...trackingProps}>
      Donate
    </StyledDonateButton>
  </DonateButtonWrapper>
);

export const DonateButtonHeart: React.FC<LinkProps> = ({ onClick }) => (
  <StyledDonateButtonHeart
    to="/donate"
    {...trackingProps}
    endIcon={<FavoriteIcon />}
    onClick={onClick}
  >
    Donate
  </StyledDonateButtonHeart>
);
