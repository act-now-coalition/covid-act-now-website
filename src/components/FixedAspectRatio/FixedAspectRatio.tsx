/**
 * Fixes the aspect ratio of the children to the given width
 * to height ratio. This works because the padding in
 * percentages is calculated based on the width of the element.
 *
 * https://css-tricks.com/aspect-ratio-boxes/
 */

import React from 'react';
import {
  FixedAspectRatioContainer,
  FixedAspectRatioInner,
} from './FixedAspectRatio.style';

export const FixedAspectRatio: React.FC<{ widthToHeight: number }> = ({
  children,
  widthToHeight,
  ...otherProps
}) => (
  <FixedAspectRatioContainer widthToHeight={widthToHeight}>
    <FixedAspectRatioInner {...otherProps}>{children}</FixedAspectRatioInner>
  </FixedAspectRatioContainer>
);

export default FixedAspectRatio;
