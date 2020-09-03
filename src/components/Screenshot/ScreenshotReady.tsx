import React from 'react';

/**
 * Empty sentinel element used when generating share / export content for
 * screenshotting purposes to indicate when the content is ready to be captured
 * (i.e. all asynchronous loading / rendering has completed).
 */
const ScreenshotReady = () => (
  <div className={'screenshot-ready'} style={{ display: 'none' }} />
);

export default ScreenshotReady;
