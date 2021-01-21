import React from 'react';
import {
  SkeletonWrapper,
  Column,
  StyledSkeletonRect,
  CircleIcon,
  ArrowIcon,
} from './RegionItem.style';
import { COLOR_MAP } from 'common/colors';

const RegionItemSkeleton = () => {
  return (
    <SkeletonWrapper>
      <CircleIcon $iconColor={COLOR_MAP.GRAY_EXPLORE_CHART} />
      <Column>
        <StyledSkeletonRect />
        <StyledSkeletonRect />
      </Column>
      <ArrowIcon />
    </SkeletonWrapper>
  );
};

export default RegionItemSkeleton;
