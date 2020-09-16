import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 1100px;
`;
const Donate = () => {
  return (
    <Wrapper>
      <iframe
        title="Donation embed"
        src="https://givebutter.com/embed/c/covidactnow"
        width="100%"
        height="100%"
        style={{ maxWidth: '601px' }}
        name="givebutter"
        frameBorder="0"
        scrolling="no"
        seamless
        data-allowPaymentRequest
      ></iframe>
      <script src="https://givebutter.com/js/widget.js"></script>
    </Wrapper>
  );
};

export default Donate;
