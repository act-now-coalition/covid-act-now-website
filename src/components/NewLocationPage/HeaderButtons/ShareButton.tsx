import React from 'react';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import { EventCategory } from 'components/Analytics';
import { LargeOutlinedButton } from 'components/ButtonSystem';
import { ShareButtonWrapper as Wrapper } from './HeaderButtons.style';

const ShareButton: React.FC<{ onClickShare: () => void }> = ({
  onClickShare,
}) => {
  return (
    <Wrapper>
      <LargeOutlinedButton
        trackingCategory={EventCategory.ENGAGEMENT}
        trackingLabel="Location page header: Share"
        onClick={onClickShare}
        endIcon={<ShareOutlinedIcon />}
      >
        Share
      </LargeOutlinedButton>
    </Wrapper>
  );
};

export default ShareButton;
