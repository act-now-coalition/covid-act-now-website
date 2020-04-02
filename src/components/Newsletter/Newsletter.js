import React from 'react';
import { StyledNewsletter } from './Newsletter.style';

const Newsletter = () => {
  return (
    <StyledNewsletter>
      {/* <iframe
        title="newsletter"
        className="mj-w-res-iframe"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src="https://app.mailjet.com/widget/iframe/1dtU/pZV"
        width="100%"
      ></iframe> */}
      <span data-sumome-listbuilder-embed-id="new-2"></span>
    </StyledNewsletter>
  );
};

export default Newsletter;
