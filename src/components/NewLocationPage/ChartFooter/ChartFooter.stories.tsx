import React from 'react';
import ShareButton from 'components/NewLocationPage/ShareButton/ShareButton';
import {
  FooterContainer,
  ButtonContainer,
  Disclaimer,
  LegendContainer,
  IconWrapper,
  LegendGroup,
} from './ChartFooter.style';

export default {
  title: 'Location page redesign/Chart Footer',
};

const footerText =
  'Over the last week, Texas has averaged 3,173 new confirmed cases per day (10.9 for every 100,000 residents).';

const legendIcon = (
  <svg
    width="8"
    height="9"
    viewBox="0 0 8 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect y="0.152344" width="8" height="8" fill="#E0E0E0" />
  </svg>
);

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

export const ChartFooterWithLegends = () => {
  return (
    <FooterContainer>
      <LegendGroup>
        <LegendContainer>
          <IconWrapper>{legendIcon}</IconWrapper>
          Legend Copy
        </LegendContainer>
        <LegendContainer>
          <IconWrapper>{legendIcon}</IconWrapper>
          Legend Copy 1
        </LegendContainer>
      </LegendGroup>
      <ButtonContainer>
        <ShareButton onClickShare={() => {}} />
      </ButtonContainer>
    </FooterContainer>
  );
};
