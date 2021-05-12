import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link to="/">Click here</Link> to return to the site.
        </p>
      </BodyCopy>
    </Wrapper>
  );
};

export default AfterSubscribe;
