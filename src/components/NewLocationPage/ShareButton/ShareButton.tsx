import React from 'react';
import { OutlinedButton } from 'components/ButtonSystem';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';

const ShareButton: React.FC<{ onClickShare: () => void }> = ({
  onClickShare,
}) => {
  return (
    <OutlinedButton onClick={onClickShare} endIcon={<ShareOutlinedIcon />}>
      Share
    </OutlinedButton>
  );
};

export default ShareButton;
