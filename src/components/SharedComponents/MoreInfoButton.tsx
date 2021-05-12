import React from 'react';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { OutlinedButton } from 'components/ButtonSystem/MainButtons.style';

const MoreInfoButton = (props: { onClick: any }) => {
  return (
    <OutlinedButton onClick={props.onClick} startIcon={<InfoOutlinedIcon />}>
      More info
    </OutlinedButton>
  );
};

export default MoreInfoButton;
