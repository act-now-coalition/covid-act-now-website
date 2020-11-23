import React, { useState, useRef } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  EmbedPreviewScrollContainer,
  CenteredModal,
  CodeSnippetPreview,
  EmbedButton,
  EmbedPreviewStyled,
  EmbedDetailsStyled,
  EmbedPreviewExitButton,
} from './EmbedPreview.style';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useEmbed } from 'common/utils/hooks';

export default function EmbedPreview({ open, onClose, county }) {
  const {
    isEmbed,
    getEmbedHeight,
    getEmbedWidth,
    getIframePath,
    getJsCodeSnippet,
    getIframeCodeSnippet,
  } = useEmbed();

  // When you click both copy links back to back, it'll trigger multiple snackbar
  // messages.  We show them serially using a queue per example at
  // https://material-ui.com/components/snackbars/#consecutive-snackbars
  const snackbarQueueRef = useRef([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const processSnackbarQueue = () => {
    if (snackbarQueueRef.current.length > 0) {
      setMessageInfo(snackbarQueueRef.current.shift());
      setSnackbarOpen(true);
    }
  };

  const handleCopySuccessMessage = message => () => {
    snackbarQueueRef.current.push({
      message,
      key: new Date().getTime(),
    });

    if (snackbarOpen) {
      // immediately begin dismissing current message
      // to start showing new one
      setSnackbarOpen(false);
    } else {
      processSnackbarQueue();
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSnackbarExited = () => {
    processSnackbarQueue();
  };

  const countyFipsCode = county && county['full_fips_code'];
  const iFramePath = getIframePath(countyFipsCode);
  const iFrameCodeSnippet = getIframeCodeSnippet(countyFipsCode);
  const jsCodeSnippet = getJsCodeSnippet(countyFipsCode);

  return (
    <>
      <CenteredModal open={open} onClose={onClose}>
        <EmbedPreviewStyled elevation="2">
          <EmbedPreviewExitButton onClick={onClose}>
            <CloseIcon />
          </EmbedPreviewExitButton>
          <EmbedPreviewScrollContainer>
            <Grid container align="center" justify="center">
              {/* If we're sharing from an embed, we don't need a preview */}
              {!isEmbed && (
                <Grid xs={12} lg={6} item>
                  <iframe
                    src={iFramePath}
                    title="Embed Preview"
                    width={getEmbedWidth(countyFipsCode)}
                    height={getEmbedHeight(countyFipsCode)}
                    frameBorder="0"
                  ></iframe>
                </Grid>
              )}
              <Grid xs={12} lg={6} item>
                <EmbedDetailsStyled condensed={isMobile}>
                  <Typography variant="h4" style={{ margin: '0.5rem 0 1rem' }}>
                    {isEmbed ? 'Share Embed' : 'Embed Preview'}
                  </Typography>
                  {!isMobile && (
                    <CodeSnippetPreview>{iFrameCodeSnippet}</CodeSnippetPreview>
                  )}
                  <CopyToClipboard
                    text={iFrameCodeSnippet}
                    onCopy={handleCopySuccessMessage(
                      'Embed iFrame snippet copied to clipboard!',
                    )}
                  >
                    <EmbedButton
                      bolder
                      color="primary"
                      variant="contained"
                      style={{ marginBottom: '0.8rem' }}
                    >
                      Copy IFrame Snippet
                    </EmbedButton>
                  </CopyToClipboard>
                  {!isMobile && (
                    <CodeSnippetPreview>{jsCodeSnippet}</CodeSnippetPreview>
                  )}
                  <CopyToClipboard
                    text={jsCodeSnippet}
                    onCopy={handleCopySuccessMessage(
                      'Embed JS snippet copied to clipboard!',
                    )}
                  >
                    <EmbedButton
                      bolder
                      color="primary"
                      variant="contained"
                      style={{ marginBottom: '0.8rem' }}
                    >
                      Copy JS Snippet
                    </EmbedButton>
                  </CopyToClipboard>
                  <Typography variant="caption" align="center">
                    Not sure? Use the Iframe snippet.
                  </Typography>
                </EmbedDetailsStyled>
              </Grid>
            </Grid>
          </EmbedPreviewScrollContainer>
        </EmbedPreviewStyled>
      </CenteredModal>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        message={messageInfo ? messageInfo.message : undefined}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        onExited={handleSnackbarExited}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}
