import React from 'react';
import ShareButton from 'components/NewLocationPage/ShareButton/ShareButton';
import {
  FooterContainer,
  ButtonContainer,
  Disclaimer,
} from './ChartFooter.style';

export default {
  title: 'Location page redesign/Chart Footer',
};

const footerText =
  'Over the last week, Texas has averaged 3,173 new confirmed cases per day (10.9 for every 100,000 residents).';

export const ChartFooterButtonOnly = () => {
  return (
    <FooterContainer>
      <Disclaimer />
      <ButtonContainer>
        <ShareButton onClickShare={() => {}} />
      </ButtonContainer>
    </FooterContainer>
  );
};

export const ChartFooterWithText = () => {
  return (
    <FooterContainer>
      <Disclaimer>{footerText}</Disclaimer>
      <ButtonContainer>
        <ShareButton onClickShare={() => {}} />
      </ButtonContainer>
    </FooterContainer>
  );
};
