import React, { Fragment, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocialButton, SocialShareButton } from './ShareButtons.style';

const CopyLinkButton: React.FC<{
  url: string;
}> = ({ url }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  return (
    <CopyToClipboard text={url} onCopy={() => setCopiedLink(true)}>
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
