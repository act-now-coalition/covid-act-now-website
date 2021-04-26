import React from 'react';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import { EventCategory } from 'components/Analytics';
import { LargeOutlinedButton } from 'components/ButtonSystem';
import { ShareButtonWrapper as Wrapper } from './HeaderButtons.style';

const ShareButton: React.FC = () => {
  return (
    <Wrapper>
      <LargeOutlinedButton
        trackingCategory={EventCategory.ENGAGEMENT}
        trackingLabel="Location page header: Share"
        to="#share"
        endIcon={<ShareOutlinedIcon />}
      >
        Share
      </LargeOutlinedButton>
    </Wrapper>
  );
};

export default ShareButton;
