import React, { Fragment } from 'react';
import chunk from 'lodash/chunk';
import ceil from 'lodash/ceil';
import partition from 'lodash/partition';
import {
  Wrapper,
  HeaderCopy,
  Intro,
  RecommendationsContainer,
  RecommendationBody,
  Icon,
  FooterLink,
  FooterHalf,
  FooterWrapper,
  Column,
  RecommendationItem,
} from './Recommend.style';
import {
  RecommendationWithIcon,
  mainContent,
  FedLevel,
  HarvardLevel,
} from 'cms-content/recommendations';
import { HeaderWrapper } from 'components/LocationPage/ChartsHolder.style';
import SmallShareButtons from 'components/SmallShareButtons';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { trackRecommendationsEvent } from 'common/utils/recommend';
import ExternalLink from 'components/ExternalLink';
import { Subtitle1 } from 'components/Typography';
import { useBreakpoint } from 'common/hooks';

const { header, footer } = mainContent;

const trackShareFacebook = () =>
  trackRecommendationsEvent(EventAction.SHARE, 'facebook');

const trackShareTwitter = () =>
  trackRecommendationsEvent(EventAction.SHARE, 'twitter');

const trackCopyLink = () => {
  trackRecommendationsEvent(EventAction.COPY_LINK, 'recommendations');
};

const Header = (props: { introCopy: string; locationName: string }) => {
  const { introCopy, locationName } = props;
  return (
    <Fragment>
      <HeaderWrapper id="recommendations">
        <HeaderCopy>{header}</HeaderCopy>
      </HeaderWrapper>
      <Subtitle1>for {locationName}</Subtitle1>
      <Intro>
        These recommendations match the guidelines set by the{' '}
        <strong>CDC</strong>. {introCopy}
      </Intro>
    </Fragment>
  );
};

const Footer: React.FC<{
  shareUrl: string;
  shareQuote: string;
  feedbackFormUrl: string;
}> = ({ feedbackFormUrl, shareUrl, shareQuote }) => {
  const feedbackOnClick = () => {
    trackEvent(
      EventCategory.RECOMMENDATIONS,
      EventAction.CLICK_LINK,
      'Feedback Form',
    );
  };

  return (
    <FooterWrapper>
      <FooterHalf>
        <ExternalLink href={feedbackFormUrl}>
          <FooterLink onClick={feedbackOnClick}>
            {footer.feedbackButtonLabel}
          </FooterLink>
        </ExternalLink>
      </FooterHalf>
      <FooterHalf>
        <SmallShareButtons
          shareUrl={shareUrl}
          shareQuote={shareQuote}
          onCopyLink={trackCopyLink}
          onShareOnFacebook={trackShareFacebook}
          onShareOnTwitter={trackShareTwitter}
        />
      </FooterHalf>
    </FooterWrapper>
  );
};

const Recommend = (props: {
  introCopy: string;
  recommendations: RecommendationWithIcon[];
  locationName: string;
  shareUrl: string;
  shareQuote: string;
  recommendationsRef: React.RefObject<HTMLDivElement>;
  feedbackFormUrl: string;
  fedLevel: FedLevel | null;
  harvardLevel: HarvardLevel | null;
  harvardModalLocationCopy: string;
  fedModalLocationCopy: string;
}) => {
  const {
    introCopy,
    recommendations,
    locationName,
    shareUrl,
    shareQuote,
    recommendationsRef,
    feedbackFormUrl,
  } = props;

  /*
    Divides recommendations into 2 columns.
    For mobile: splits originally-ordered recommendations array in half.
    For desktop: splits by even/odds so the highest 'ranked' recommendations will appear on top.
  */
  const midpoint = ceil(recommendations.length / 2);
  const halvedInOrder = chunk(recommendations, midpoint);
  const partitionedByIndex = partition(
    recommendations,
    item => item.index % 2 === 0,
  );

  const isMobile = useBreakpoint(600);
  const recommendationsColumns = isMobile ? halvedInOrder : partitionedByIndex;

  return (
    <Wrapper ref={recommendationsRef}>
      <Header introCopy={introCopy} locationName={locationName} />
      <RecommendationsContainer>
        {recommendationsColumns.map((half, j) => {
          return (
            <Column key={`half-${j}`}>
              {half.map((recommendation, i) => {
                return (
                  <RecommendationItem
                    key={`recommendation-${i}`}
                    highlight={false}
                  >
                    <Icon
                      src={recommendation.iconInfo.iconImage}
                      alt={recommendation.iconInfo.altText}
                    />
                    <RecommendationBody
                      className={recommendation.recommendationInfo.category}
                      source={recommendation.recommendationInfo.body}
                    />
                  </RecommendationItem>
                );
              })}
            </Column>
          );
        })}
      </RecommendationsContainer>
      <Footer
        shareUrl={shareUrl}
        shareQuote={shareQuote}
        feedbackFormUrl={feedbackFormUrl}
      />
    </Wrapper>
  );
};

export default Recommend;
