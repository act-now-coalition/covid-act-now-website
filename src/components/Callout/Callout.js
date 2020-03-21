import React from 'react';
import {
  StyledCallout,
} from './Callout.style';

const Callout = ({
  children,
  backgroundColor = 'white',
  borderColor = '#e3e3e3',
}) => {
  return (
    <StyledCallout style={{
      backgroundColor: backgroundColor,
      borderColor: borderColor
    }}>
      {children}
    </StyledCallout>
  )
}

export default Callout;
