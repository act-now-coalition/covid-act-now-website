import React from 'react';
import Donate from './utils';
import {
  StyledIframe,
  GiveMomentumEmbedWrapper,
} from 'screens/Donate/Donate.style';

const GiveMomentumEmbed: React.ReactNode = (
  <GiveMomentumEmbedWrapper>
    <StyledIframe
      src="https://covidactnow.givemomentum.com/?show-container=true"
      id="momentum-donation-form"
      width="100%"
      height="100%"
    />
    <script
      src="https://donation-form-static.givemomentum.com/widget.js"
      type="text/javascript"
    ></script>
  </GiveMomentumEmbedWrapper>
);

const GiveMomentumDonate: React.FC = () => (
  <Donate embedComponent={GiveMomentumEmbed} />
);

export default GiveMomentumDonate;
