import React from 'react';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { OutlinedButton } from 'components/ButtonSystem/MainButtons.style';
import { EventCategory } from 'components/Analytics/utils';

const MoreInfoButton = (props: { onClick: any }) => {
  return (
    <OutlinedButton
      onClick={props.onClick}
      startIcon={<InfoOutlinedIcon />}
      trackingCategory={EventCategory.COMPARE}
      trackingLabel="more info button"
    >
      More info
    </OutlinedButton>
  );
};

export default MoreInfoButton;
