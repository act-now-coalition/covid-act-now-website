import React, { Fragment } from 'react';
import {
  Wrapper,
  HeaderCopy,
  LocationName,
  Intro,
  RecommendationsContainer,
  RecommendationWrapper,
  RecommendationBody,
  Icon,
  FooterLink,
  ShareText,
  FooterHalf,
  FooterWrapper,
} from './Recommend.style';
import { mainContent } from 'cms-content/recommendations';
import { RecommendationWithIcon } from 'cms-content/recommendations';
import SmallShareButtons from 'components/SmallShareButtons';

const { header, footer } = mainContent;

const Header = (props: { introCopy: string; locationName: string }) => {
  const { introCopy, locationName } = props;
  return (
    <Fragment>
      <HeaderCopy>{header}</HeaderCopy>
      <LocationName>for {locationName}</LocationName>
      <Intro>
        These recommendations match the guidelines set by{' '}
        <strong>White House Coronavirus Task Force</strong> and{' '}
        <strong>Harvard Global Health Institute</strong> {introCopy}{' '}
        <span>Learn more.</span>
      </Intro>
    </Fragment>
  );
};

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterHalf>
        <FooterLink>{footer.modalButtonLabel}</FooterLink>
        <FooterLink>{footer.feedbackButtonLabel}</FooterLink>
      </FooterHalf>
      <FooterHalf>
        <SmallShareButtons />
        <ShareText source={footer.shareText} />
      </FooterHalf>
    </FooterWrapper>
  );
};

//TODO (chelsi): add in correct icon info when added to cms
const Recommend = (props: {
  introCopy: string;
  recommendations: RecommendationWithIcon[];
  locationName: string;
}) => {
  const { introCopy, recommendations, locationName } = props;
  return (
    <Wrapper>
      <Header introCopy={introCopy} locationName={locationName} />
      <RecommendationsContainer>
        {recommendations.map((recommendation, i) => (
          <Fragment>
            <RecommendationWrapper index={i}>
              <Icon src="/images_cms/recommend-mask.png" />
              <RecommendationBody
                source={recommendation.recommendationInfo.body}
              />
            </RecommendationWrapper>
          </Fragment>
        ))}
      </RecommendationsContainer>
      <Footer />
    </Wrapper>
  );
};

export default Recommend;
