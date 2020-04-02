import React from 'react';
import { StyledNewsletter } from './Newsletter.style';

const Newsletter = () => {
  return (
    <StyledNewsletter>
      <iframe
        title="newsletter"
        className="mj-w-res-iframe"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src="https://app.mailjet.com/widget/iframe/1dtU/pZV"
        width="100%"
      ></iframe>
      <button class="sumome-listbuilder-id-93b0ee9a31c30132f8c3e6b586feac9f4904126edcae1426f98bced80950ea58">
        Click me!
      </button>
      <button data-sumome-listbuilder-embed-id="93b0ee9a31c30132f8c3e6b586feac9f4904126edcae1426f98bced80950ea58">
        Click me to test Sumo!
      </button>
    </StyledNewsletter>
  );
};

export default Newsletter;
