import React from 'react';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import { EventCategory } from 'components/Analytics';
import { StyledShareButton } from './HeaderButtons.style';

const ShareButton: React.FC<{ onClickShare: () => void }> = ({
  onClickShare,
}) => {
  return (
    <StyledShareButton
      trackingCategory={EventCategory.ENGAGEMENT}
      trackingLabel="Location page header: Share"
      onClick={onClickShare}
      endIcon={<ShareOutlinedIcon />}
    >
      Share
    </StyledShareButton>
  );
};

export default ShareButton;
