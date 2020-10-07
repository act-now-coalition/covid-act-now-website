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
import { mainContent } from 'cms-content/recommendations';
import { RecommendationWithIcon } from 'cms-content/recommendations';
import RecommendModal from './RecommendModal';
import Dialog, { useDialog } from 'components/Dialog';

const { header, footer } = mainContent;

const Header = (props: { introCopy: string }) => {
  return (
    <Fragment>
      <HeaderCopy>{header}</HeaderCopy>
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

const Footer: React.FC<{ onClickOpenModal: () => void }> = ({
  onClickOpenModal,
}) => {
  return (
    <Fragment>
      <div>
        <FooterLink onClick={onClickOpenModal}>
          {footer.modalButtonLabel}
        </FooterLink>
        <FooterLink>{footer.feedbackButtonLabel}</FooterLink>
      </div>
      <ShareText source={footer.shareText} />
    </Fragment>
  );
};

//TODO (chelsi): add in correct icon info when added to cms
const Recommend = (props: {
  introCopy: string;
  recommendations: RecommendationWithIcon[];
}) => {
  const { introCopy, recommendations } = props;
  const [isDialogOpen, openDialog, closeDialog] = useDialog(false);
  return (
    <Wrapper>
      <Header introCopy={introCopy} />
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
      <Footer onClickOpenModal={openDialog} />
      <Dialog open={isDialogOpen} closeDialog={closeDialog}>
        <RecommendModal />
      </Dialog>
    </Wrapper>
  );
};

export default Recommend;
