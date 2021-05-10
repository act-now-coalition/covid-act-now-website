import React from 'react';
import { StyledShareButton } from './ShareButton.style';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';

const ShareButton: React.FC<{ onClickShare: () => void }> = ({
  onClickShare,
}) => {
  return (
    <StyledShareButton endIcon={<ShareOutlinedIcon />}>Share</StyledShareButton>
  );
};

export default ShareButton;
