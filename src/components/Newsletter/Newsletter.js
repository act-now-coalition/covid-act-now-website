import React from 'react';
import { StyledNewsletter } from './Newsletter.style';

const Newsletter = () => {
  return (
    <StyledNewsletter>
      <iframe class="mj-w-res-iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://app.mailjet.com/widget/iframe/1dtU/pXf" width="100%"></iframe>
    </StyledNewsletter>
  );
};

export default Newsletter;
