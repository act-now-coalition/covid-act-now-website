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
import { mainContent, modalContent } from 'cms-content/recommendations';
import { RecommendationWithIcon } from 'cms-content/recommendations';
import SmallShareButtons from 'components/SmallShareButtons';
import RecommendModal from './RecommendModal';
import Dialog, { useDialog } from 'components/Dialog';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

const { header, footer } = mainContent;
const { federalTaskForce, harvard } = modalContent;

const Header = (props: { introCopy: string; locationName: string }) => {
  const { introCopy, locationName } = props;
  return (
    <Fragment>
      <HeaderCopy>{header}</HeaderCopy>
      <LocationName>for {locationName}</LocationName>
      <Intro>
        These recommendations match the guidelines set by{' '}
        <strong>{federalTaskForce.sourceName}</strong> and{' '}
        <strong>{harvard.sourceName}</strong> {introCopy}{' '}
        <span>Learn more.</span>
      </Intro>
    </Fragment>
  );
};

const Footer: React.FC<{
  onClickOpenModal: () => void;
  shareUrl: string;
  shareQuote: string;
}> = ({ onClickOpenModal, shareUrl, shareQuote }) => {
  const trackLabel = 'recommendations';

  return (
    <FooterWrapper>
      <FooterHalf>
        <FooterLink onClick={onClickOpenModal}>
          {footer.modalButtonLabel}
        </FooterLink>
        <FooterLink>{footer.feedbackButtonLabel}</FooterLink>
      </FooterHalf>
      <FooterHalf>
        <SmallShareButtons
          shareUrl={shareUrl}
          shareQuote={shareQuote}
          trackLabel={trackLabel}
        />
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
  shareUrl: string;
  shareQuote: string;
  recommendationsRef: React.RefObject<HTMLDivElement>;
}) => {
  const {
    introCopy,
    recommendations,
    locationName,
    shareUrl,
    shareQuote,
    recommendationsRef,
  } = props;
  const [isDialogOpen, openDialog, closeDialog] = useDialog(false);

  const openModalRecommendations = () => {
    openDialog();
    trackEvent(
      EventCategory.RECOMMENDATIONS,
      EventAction.OPEN_MODAL,
      'Methodology & Sources',
    );
  };

  console.log('recommendations', recommendations);

  return (
    <Wrapper ref={recommendationsRef}>
      <Header introCopy={introCopy} locationName={locationName} />
      <RecommendationsContainer>
        {recommendations.map((recommendation, i) => (
          <Fragment key={`recommendation-${i}`}>
            <RecommendationWrapper index={i}>
              <Icon
                src={recommendation.iconInfo.iconImage}
                alt={recommendation.iconInfo.altText}
              />
              <RecommendationBody
                source={recommendation.recommendationInfo.body}
              />
            </RecommendationWrapper>
          </Fragment>
        ))}
      </RecommendationsContainer>
      <Footer
        onClickOpenModal={openModalRecommendations}
        shareUrl={shareUrl}
        shareQuote={shareQuote}
      />
      <Dialog
        open={isDialogOpen}
        closeDialog={closeDialog}
        fullWidth
        maxWidth="md"
      >
        <RecommendModal />
      </Dialog>
    </Wrapper>
  );
};

export default Recommend;
