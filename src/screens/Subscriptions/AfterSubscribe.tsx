import React from 'react';
import { Wrapper, Header, BodyCopy } from './Subscriptions.style';

const AfterSubscribe = () => {
  return (
    <Wrapper>
      <Header>Thank you</Header>
      <BodyCopy>
        <p>
          Your subscription has been confirmed. You've been added to our list
          and will hear from us soon.
        </p>
        <p>
          <a href="/">Click here</a> to return to the site.
        </p>
      </BodyCopy>
    </Wrapper>
  );
};

export default AfterSubscribe;
