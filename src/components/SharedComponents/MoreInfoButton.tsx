import React from 'react';
import { MoreInfo } from './MoreInfoButton.style';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const MoreInfoButton = (props: { onClick: any }) => {
  return (
    <MoreInfo onClick={props.onClick}>
      <InfoOutlinedIcon />
      More info
    </MoreInfo>
  );
};

export default MoreInfoButton;
