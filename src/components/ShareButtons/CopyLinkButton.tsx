import React, { Fragment, useState } from 'react';
import { SocialButton, SocialShareButton } from './ShareButtons.style';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyLinkButton = ({ url, onCopyLink = () => {} }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  return (
    <CopyToClipboard
      text={url}
      onCopy={() => {
        setCopiedLink(true);
        onCopyLink();
      }}
    >
      <SocialShareButton variant="contained" disableElevation color="#007fb1">
        <SocialButton disableRipple disableFocusRipple disableTouchRipple>
          {copiedLink ? (
            'Copied!'
          ) : (
            <Fragment>
              Copy
              <br />
              Link
            </Fragment>
          )}
        </SocialButton>
      </SocialShareButton>
    </CopyToClipboard>
  );
};

export default CopyLinkButton;
