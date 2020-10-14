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
import { LinkButton } from 'components/Button';
import { trackRecommendationsEvent } from 'common/utils/recommend';

const { header, footer } = mainContent;
const { federalTaskForce, harvard } = modalContent;

const trackShareFacebook = () =>
  trackRecommendationsEvent(EventAction.SHARE, 'facebook');

const trackShareTwitter = () =>
  trackRecommendationsEvent(EventAction.SHARE, 'twitter');

const trackCopyLink = () => {
  trackRecommendationsEvent(EventAction.COPY_LINK, 'recommendations');
};

const Header = (props: {
  introCopy: string;
  locationName: string;
  onClickOpenModal: () => void;
}) => {
  const { introCopy, locationName, onClickOpenModal } = props;
  return (
    <Fragment>
      <HeaderCopy>{header}</HeaderCopy>
      <LocationName>for {locationName}</LocationName>
      <Intro>
        These recommendations match the guidelines set by{' '}
        <strong>{federalTaskForce.sourceName}</strong> and{' '}
        <strong>{harvard.sourceName}</strong> {introCopy}{' '}
        <LinkButton onClick={onClickOpenModal}>Learn more.</LinkButton>
      </Intro>
    </Fragment>
  );
};

const Footer: React.FC<{
  onClickOpenModal: () => void;
  onClickOpenFeedbackModal: () => void;
  shareUrl: string;
  shareQuote: string;
}> = ({ onClickOpenModal, onClickOpenFeedbackModal, shareUrl, shareQuote }) => {
  return (
    <FooterWrapper>
      <FooterHalf>
        <FooterLink onClick={onClickOpenModal}>
          {footer.modalButtonLabel}
        </FooterLink>
        <FooterLink onClick={onClickOpenFeedbackModal}>
          {footer.feedbackButtonLabel}
        </FooterLink>
      </FooterHalf>
      <FooterHalf>
        <SmallShareButtons
          shareUrl={shareUrl}
          shareQuote={shareQuote}
          onCopyLink={trackCopyLink}
          onShareOnFacebook={trackShareFacebook}
          onShareOnTwitter={trackShareTwitter}
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
  const [
    isFeedbackDialogOpen,
    openFeedbackDialog,
    closeFeedbackDialog,
  ] = useDialog(false);

  const openModalRecommendations = () => {
    openDialog();
    trackEvent(
      EventCategory.RECOMMENDATIONS,
      EventAction.OPEN_MODAL,
      'Methodology & Sources',
    );
  };

  const openModalFeedback = () => {
    openFeedbackDialog();
    trackEvent(
      EventCategory.RECOMMENDATIONS,
      EventAction.OPEN_MODAL,
      'Feedback Form',
    );
  };

  return (
    <Wrapper ref={recommendationsRef}>
      <Header
        introCopy={introCopy}
        locationName={locationName}
        onClickOpenModal={openModalRecommendations}
      />
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
        onClickOpenFeedbackModal={openModalFeedback}
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
      <Dialog
        open={isFeedbackDialogOpen}
        closeDialog={closeFeedbackDialog}
        fullWidth
        maxWidth="md"
      >
        {/* TODO: Add the embed form here */}
        Feedback
      </Dialog>
    </Wrapper>
  );
};

export default Recommend;
