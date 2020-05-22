import React, { Fragment, useState, useRef } from 'react';
import useOutsideClickHandler from '../../common/utils/useOutsideClickHandler';
import SocialButtons from './SocialButtons';
import {
  SaveOrShareContainer,
  SaveOrShareButton,
  DesktopButtonsWrapper,
  MobileButtonsWrapper,
} from './ShareButtons.style';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const InnerContent = props => {
  const { iconSize, setShowShareIcons, showShareIcons } = props;

  return (
    <Fragment>
      <SaveOrShareContainer>
        <SaveOrShareButton
          onClick={() => {
            setShowShareIcons(false);
          }}
        >
          Save
        </SaveOrShareButton>
        <SaveOrShareButton
          isLast
          onClick={() => {
            setShowShareIcons(!showShareIcons);
          }}
        >
          Share
        </SaveOrShareButton>
      </SaveOrShareContainer>
      {showShareIcons && <SocialButtons iconSize={iconSize} />}
    </Fragment>
  );
};

const ShareButtons = props => {
  const { isFirst, chartAbove } = props;
  const [showShareIcons, setShowShareIcons] = useState(false);

  const shareButtonsRef = useRef(null);

  useOutsideClickHandler(shareButtonsRef, setShowShareIcons);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Fragment>
      {isMobile && (
        <MobileButtonsWrapper isFirst={isFirst} ref={shareButtonsRef}>
          <InnerContent
            iconSize="40"
            showShareIcons={showShareIcons}
            setShowShareIcons={setShowShareIcons}
          />
        </MobileButtonsWrapper>
      )}
      {!isMobile && (
        <DesktopButtonsWrapper
          isFirst={isFirst}
          chartAbove={chartAbove}
          ref={shareButtonsRef}
        >
          <InnerContent
            iconSize="50"
            showShareIcons={showShareIcons}
            setShowShareIcons={setShowShareIcons}
          />
        </DesktopButtonsWrapper>
      )}
    </Fragment>
  );
};

export default ShareButtons;
