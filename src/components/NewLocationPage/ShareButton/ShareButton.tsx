import React from 'react';
import { OutlinedButton } from 'components/ButtonSystem';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import { EventCategory } from 'components/Analytics/utils';

const ShareButton: React.FC<{ onClickShare: () => void }> = ({
  onClickShare,
}) => {
  return (
    <OutlinedButton
      onClick={onClickShare}
      endIcon={<ShareOutlinedIcon />}
      trackingCategory={EventCategory.ENGAGEMENT}
      trackingLabel="share button"
    >
      Share
    </OutlinedButton>
  );
};

export default ShareButton;
