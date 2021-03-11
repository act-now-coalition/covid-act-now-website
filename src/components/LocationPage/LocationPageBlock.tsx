import React from 'react';
import ErrorBoundary from 'components/ErrorBoundary';
import { BlockContainer } from './LocationPageBlock.style';

type LocationPageBlockProps = React.ComponentProps<typeof BlockContainer>;

const LocationPageBlock: React.FC<LocationPageBlockProps> = props => (
  <ErrorBoundary>
    <BlockContainer {...props} />
  </ErrorBoundary>
);

export default LocationPageBlock;
