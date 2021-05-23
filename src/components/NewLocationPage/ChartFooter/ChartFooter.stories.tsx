import React from 'react';
import ShareButton from 'components/NewLocationPage/ShareButton/ShareButton';
import {
  Footer,
  FooterSection,
  SingleButtonWrapper,
  ButtonContainer,
  LegendContainer,
  LegendContent,
  FooterText,
  AboutText,
  IconWrapper,
} from './ChartFooter.style';
import { useBreakpoint } from 'common/hooks';

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
    <Footer>
      <FooterSection>
        <SingleButtonWrapper>
          <ButtonContainer>
            <ShareButton onClickShare={() => {}} />
          </ButtonContainer>
        </SingleButtonWrapper>
      </FooterSection>
    </Footer>
  );
};

export const ChartFooterWithAboutText = () => {
  return (
    <Footer>
      <FooterSection>
        <LegendContainer>
          <LegendContent>
            <AboutText>About this data</AboutText>
          </LegendContent>
        </LegendContainer>
        <ButtonContainer>
          <ShareButton onClickShare={() => {}} />
        </ButtonContainer>
      </FooterSection>
    </Footer>
  );
};

export const ChartFooterWithLegend = () => {
  return (
    <Footer>
      <FooterSection>
        <LegendContainer>
          <LegendContent>
            <IconWrapper>{legendIcon}</IconWrapper>
            Legend Copy
          </LegendContent>
          <LegendContent>
            <IconWrapper>{legendIcon}</IconWrapper>
            Copy to explain bars. This copy may be long.
          </LegendContent>
        </LegendContainer>
        <ButtonContainer>
          <ShareButton onClickShare={() => {}} />
        </ButtonContainer>
      </FooterSection>
    </Footer>
  );
};

export const ChartFooterWithTextAndLegend = () => {
  const isMobile = useBreakpoint(600);
  return (
    <Footer>
      <FooterSection>
        <FooterText>
          {footerText}&nbsp;
          {!isMobile && <AboutText>About this data</AboutText>}
        </FooterText>
        {!isMobile && (
          <ButtonContainer>
            <ShareButton onClickShare={() => {}} />
          </ButtonContainer>
        )}
      </FooterSection>
      {isMobile && (
        <FooterSection>
          <LegendContainer>
            <LegendContent>
              <AboutText>About this data</AboutText>
            </LegendContent>
          </LegendContainer>
          <ButtonContainer>
            <ShareButton onClickShare={() => {}} />
          </ButtonContainer>
        </FooterSection>
      )}
    </Footer>
  );
};
