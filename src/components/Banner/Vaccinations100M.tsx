import React from 'react';
import { Wrapper, InnerContainer, Body } from './SpringSurgeBanner.style';

const BannerInner: React.FC = () => {
  return (
    <InnerContainer>
      <Body>
        Over 100M people in the US have received at least one dose of a COVID
        vaccine! Stay safe and let’s keep it up so we can all get back to normal
        as soon as possible. Share on facebook or twitter.
      </Body>
    </InnerContainer>
  );
};

const Vaccinations100M: React.FC = () => {
  return (
    <Wrapper>
      <BannerInner />
    </Wrapper>
  );
};

export default Vaccinations100M;
