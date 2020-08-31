export { default as ScreenshotReady } from './ScreenshotReady';

/**
 * This class name must be used to mark content that should be included in
 * screenshotting purposes.
 *
 * It should be paired with a <ScreenshotReady /> element, which indicates when
 * the content is fully-rendered and ready for the screenshot to be taken.
 */
export const SCREENSHOT_CLASS = 'screenshot';
