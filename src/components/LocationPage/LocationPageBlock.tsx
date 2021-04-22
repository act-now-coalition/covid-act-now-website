import React from 'react';
import ErrorBoundary from 'components/ErrorBoundary';
import { BlockContainer } from './LocationPageBlock.style';

type LocationPageBlockProps = React.ComponentProps<typeof BlockContainer>;

const LocationPageBlock: React.FC<LocationPageBlockProps> = React.forwardRef(
  (props, ref) => (
    <ErrorBoundary>
      <BlockContainer ref={ref} {...props} />
    </ErrorBoundary>
  ),
);

export default LocationPageBlock;
