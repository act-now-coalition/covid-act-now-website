import React from 'react';
import ShareButton from 'components/NewLocationPage/ShareButton/ShareButton';
import {
  Footer,
  FooterSection,
  SingleButtonWrapper,
  ButtonContainerA,
  LegendContainerA,
  LegendContent,
  AboutText,
  FooterContainer,
  MobileFooterContainer,
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

export const ChartFooterButtonOnlyA = () => {
  return (
    <Footer>
      <FooterSection>
        <SingleButtonWrapper>
          <ButtonContainerA>
            <ShareButton onClickShare={() => {}} />
          </ButtonContainerA>
        </SingleButtonWrapper>
      </FooterSection>
    </Footer>
  );
};

export const ChartFooterWithAboutText = () => {
  return (
    <Footer>
      <FooterSection>
        <LegendContainerA>
          <LegendContent>
            <AboutText>About this data</AboutText>
          </LegendContent>
        </LegendContainerA>
        <ButtonContainerA>
          <ShareButton onClickShare={() => {}} />
        </ButtonContainerA>
      </FooterSection>
    </Footer>
  );
};

export const ChartFooterWithLegend = () => {
  return (
    <Footer>
      <FooterSection>
        <LegendContainerA>
          <LegendContent>
            <IconWrapper>{legendIcon}</IconWrapper>
            Legend Copy
          </LegendContent>
          <LegendContent>
            <IconWrapper>{legendIcon}</IconWrapper>
            Copy to explain bars. This copy may be long.
          </LegendContent>
        </LegendContainerA>
        <ButtonContainerA>
          <ShareButton onClickShare={() => {}} />
        </ButtonContainerA>
      </FooterSection>
    </Footer>
  );
};

// export const ChartFooterButtonOnly = () => {
//   return (
//     <FooterContainer>
//       <Disclaimer />
//       <ButtonContainer>
//         <ShareButton onClickShare={() => {}} />
//       </ButtonContainer>
//     </FooterContainer>
//   );
// };

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

export const ChartFooterWithTextAndLegend = () => {
  return (
    <MobileFooterContainer>
      <Disclaimer>{footerText}</Disclaimer>
      <FooterContainer>
        <LegendContainer>Legend Copy</LegendContainer>
        <ButtonContainer>
          <ShareButton onClickShare={() => {}} />
        </ButtonContainer>
      </FooterContainer>
    </MobileFooterContainer>
  );
};

export const ChartFooterWithTextAndLegends = () => {
  return (
    <MobileFooterContainer>
      <Disclaimer>{footerText}</Disclaimer>
      <FooterContainer>
        <LegendContainer>Legend Copy</LegendContainer>
        <ButtonContainer>
          <ShareButton onClickShare={() => {}} />
        </ButtonContainer>
      </FooterContainer>
    </MobileFooterContainer>
  );
};
