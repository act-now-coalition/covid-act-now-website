import React from 'react';
import {
  BannerContainer,
  InnerContainer,
  Body,
} from './Vaccinations100M.style';

const Vaccinations100M: React.FC = () => {
  return (
    <BannerContainer>
      <InnerContainer>
        <Body>
          <strong>
            Over 100M people in the US have received at least one dose of a
            COVID vaccine!
          </strong>{' '}
          <span>
            Stay safe and let’s keep it up so we can all get back to normal as
            soon as possible.
          </span>
        </Body>
      </InnerContainer>
    </BannerContainer>
  );
};

export default Vaccinations100M;
