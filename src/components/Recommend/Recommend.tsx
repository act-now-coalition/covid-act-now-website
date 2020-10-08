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
import RecommendModal from './RecommendModal';
import Dialog, { useDialog } from 'components/Dialog';

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

const Footer: React.FC<{ onClickOpenModal: () => void; shareUrl: string }> = ({
  onClickOpenModal,
  shareUrl,
}) => {
  return (
    <FooterWrapper>
      <FooterHalf>
        <FooterLink onClick={onClickOpenModal}>
          {footer.modalButtonLabel}
        </FooterLink>
        <FooterLink>{footer.feedbackButtonLabel}</FooterLink>
      </FooterHalf>
      <FooterHalf>
        <SmallShareButtons shareUrl={shareUrl} />
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
  recommendationsRef: React.RefObject<HTMLDivElement>;
}) => {
  const {
    introCopy,
    recommendations,
    locationName,
    shareUrl,
    recommendationsRef,
  } = props;
  // const { introCopy, recommendations } = props;
  const [isDialogOpen, openDialog, closeDialog] = useDialog(false);
  return (
    <Wrapper ref={recommendationsRef}>
      <Header introCopy={introCopy} locationName={locationName} />
      <RecommendationsContainer>
        {recommendations.map((recommendation, i) => (
          <Fragment key={`recommendation-${i}`}>
            <RecommendationWrapper index={i}>
              <Icon src="/images_cms/recommend-mask.png" />
              <RecommendationBody
                source={recommendation.recommendationInfo.body}
              />
            </RecommendationWrapper>
          </Fragment>
        ))}
      </RecommendationsContainer>
      <Footer onClickOpenModal={openDialog} shareUrl={shareUrl} />
      <Dialog open={isDialogOpen} closeDialog={closeDialog}>
        <RecommendModal />
      </Dialog>
    </Wrapper>
  );
};

export default Recommend;
