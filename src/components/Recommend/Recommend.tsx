import React, { Fragment } from 'react';
import { Hidden } from '@material-ui/core';
import { chunk, ceil, partition } from 'lodash';
import {
  Wrapper,
  HeaderCopy,
  Intro,
  RecommendationsContainer,
  RecommendationBody,
  Icon,
  FooterLink,
  ShareText,
  FooterHalf,
  FooterWrapper,
  Column,
  RecommendationItem,
} from './Recommend.style';
import {
  RecommendationWithIcon,
  mainContent,
  modalContent,
  FedLevel,
  HarvardLevel,
} from 'cms-content/recommendations';
import { HeaderWrapper } from 'components/LocationPage/ChartsHolder.style';
import SmallShareButtons from 'components/SmallShareButtons';
import RecommendModal from './RecommendModal';
import Dialog, { useDialog } from 'components/Dialog';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { LinkButton } from 'components/Button';
import { trackRecommendationsEvent } from 'common/utils/recommend';
import * as ModalStyle from './RecommendModal.style';
import ExternalLink from 'components/ExternalLink';
import { Subtitle1 } from 'components/Typography';
import { useBreakpoint } from 'common/hooks';

const { header, footer } = mainContent;
const { federalTaskForce } = modalContent;

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
      <HeaderWrapper>
        <HeaderCopy>{header}</HeaderCopy>
      </HeaderWrapper>
      <Subtitle1>for {locationName}</Subtitle1>
      <Intro>
        These recommendations match the guidelines set by the{' '}
        <strong>{federalTaskForce.sourceName}</strong> and the{' '}
        <strong>CDC</strong>. {introCopy}{' '}
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
      <Header
        introCopy={introCopy}
        locationName={locationName}
        onClickOpenModal={openModalRecommendations}
      />
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
        onClickOpenModal={openModalRecommendations}
        shareUrl={shareUrl}
        shareQuote={shareQuote}
        feedbackFormUrl={feedbackFormUrl}
      />
      <Dialog
        open={isDialogOpen}
        closeDialog={closeDialog}
        renderHeader={renderModalTitle}
        style={{ maxWidth: '700px', margin: 'auto' }}
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
