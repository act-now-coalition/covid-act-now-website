import React from 'react';
import {
  Container,
  StyledSkeletonLine,
  StyledSkeletonRect,
} from './LazyLoading.style';

const SuspenseFallback: React.FC = () => {
  return (
    <Container>
      <StyledSkeletonLine />
      <StyledSkeletonLine />
      <StyledSkeletonLine />
      <StyledSkeletonRect />
      <StyledSkeletonLine />
      <StyledSkeletonLine />
      <StyledSkeletonLine />
      <StyledSkeletonRect />
    </Container>
  );
};

export default SuspenseFallback;
