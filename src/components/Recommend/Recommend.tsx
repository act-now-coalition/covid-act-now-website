import React, { Fragment } from 'react';
import { Hidden } from '@material-ui/core';
import {
  Wrapper,
  HeaderCopy,
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
import {
  RecommendationWithIcon,
  mainContent,
  modalContent,
  FedLevel,
  HarvardLevel,
} from 'cms-content/recommendations';
import SmallShareButtons from 'components/SmallShareButtons';
import RecommendModal from './RecommendModal';
import Dialog, { useDialog } from 'components/Dialog';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { LinkButton } from 'components/Button';
import { trackRecommendationsEvent } from 'common/utils/recommend';
import * as ModalStyle from './RecommendModal.style';
import ExternalLink from 'components/ExternalLink';
import { sortBy } from 'lodash';
import { Subtitle1 } from 'components/Typography';

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
      <Subtitle1>for {locationName}</Subtitle1>
      <Intro>
        These recommendations match the guidelines set by{' '}
        <strong>{federalTaskForce.sourceName}</strong> and{' '}
        <strong>{harvard.sourceName}</strong>. {introCopy}{' '}
        <LinkButton onClick={onClickOpenModal}>Learn more</LinkButton>.
      </Intro>
    </Fragment>
  );
};

const Footer: React.FC<{
  onClickOpenModal: () => void;
  shareUrl: string;
  shareQuote: string;
  feedbackFormUrl: string;
}> = ({ onClickOpenModal, feedbackFormUrl, shareUrl, shareQuote }) => {
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
        <FooterLink onClick={onClickOpenModal}>
          {footer.modalButtonLabel}
        </FooterLink>
        <Hidden xsDown>
          <ExternalLink href={feedbackFormUrl}>
            <FooterLink onClick={feedbackOnClick}>
              {footer.feedbackButtonLabel}
            </FooterLink>
          </ExternalLink>
        </Hidden>
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

const renderModalTitle = () => (
  <Fragment>
    <ModalStyle.Title>{modalContent.header}</ModalStyle.Title>
    <ModalStyle.Subtitle>for official recommendations</ModalStyle.Subtitle>
  </Fragment>
);

//TODO (chelsi): add in correct icon info when added to cms
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
    fedLevel,
    harvardLevel,
    harvardModalLocationCopy,
    fedModalLocationCopy,
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

  const getRecommendationLength = (recommendation: any) =>
    recommendation.recommendationInfo.body.length;
  const recommendationsSortedByLength = sortBy(
    recommendations,
    getRecommendationLength,
  );

  return (
    <Wrapper ref={recommendationsRef}>
      <Header
        introCopy={introCopy}
        locationName={locationName}
        onClickOpenModal={openModalRecommendations}
      />
      <RecommendationsContainer>
        {recommendationsSortedByLength.map((recommendation, i) => (
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
        feedbackFormUrl={feedbackFormUrl}
      />
      <Dialog
        open={isDialogOpen}
        closeDialog={closeDialog}
        fullWidth
        maxWidth="md"
        renderHeader={renderModalTitle}
      >
        <RecommendModal
          fedLevel={fedLevel}
          harvardLevel={harvardLevel}
          fedModalLocationCopy={fedModalLocationCopy}
          harvardModalLocationCopy={harvardModalLocationCopy}
        />
      </Dialog>
    </Wrapper>
  );
};

export default Recommend;
