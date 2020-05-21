import React, { useState, useEffect, useRef } from 'react';

import SocialButtons from './SocialButtons';

import {
  SaveOrShareContainer,
  SaveOrShareButton,
  DesktopButtonsWrapper,
} from './ShareButtons.style';

const ShareButtonsDesktop = props => {
  const { isFirst, chartAbove } = props;
  const [showShareIcons, setShowShareIcons] = useState(false);

  const iconSize = 50;

  function useOutsideClickHandler(ref) {
    useEffect(() => {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setShowShareIcons(false);
        }
      }
      document.addEventListener('mousedown', handleClick);
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    }, [ref]);
  }

  const shareButtonsRef = useRef(null);

  useOutsideClickHandler(shareButtonsRef);

  return (
    <DesktopButtonsWrapper
      isFirst={isFirst}
      chartAbove={chartAbove}
      ref={shareButtonsRef}
    >
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
    </DesktopButtonsWrapper>
  );
};

export default ShareButtonsDesktop;
