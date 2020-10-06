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
} from './Recommend.style';
import { RecommendationsMainContent } from 'cms-content/recommendations';

const Header = (props: { introCopy: string }) => {
  return (
    <Fragment>
      <HeaderCopy>Official Recommendations</HeaderCopy>
      <LocationName>for harris county, tx</LocationName>
      <Intro>
        These recommendations match the guidelines set by{' '}
        <strong>White House Coronavirus Task Force</strong> and{' '}
        <strong>Harvard Global Health Institute</strong> {props.introCopy}{' '}
        <span>Learn more.</span>
      </Intro>
    </Fragment>
  );
};

const Footer = () => {
  return (
    <Fragment>
      <div>
        <FooterLink>
          {RecommendationsMainContent.footer.modalButtonLabel}
        </FooterLink>
        <FooterLink>
          {RecommendationsMainContent.footer.feedbackButtonLabel}
        </FooterLink>
      </div>
      <ShareText source={RecommendationsMainContent.footer.shareText} />
    </Fragment>
  );
};

//TODO (chelsi): add in correct icon info when added to cms
const Recommend = (props: {
  introCopy: string;
  // recommendations: Recommendation[];
  recommendations: any[];
}) => {
  const { introCopy, recommendations } = props;
  console.log('recommendations', props.recommendations);
  return (
    <Wrapper>
      <Header introCopy={introCopy} />
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
