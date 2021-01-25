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
        <StyledSkeletonRect width={210} height={14} />
        <StyledSkeletonRect width={75} height={14} />
      </Column>
      <ArrowIcon />
    </SkeletonWrapper>
  );
};

export default RegionItemSkeleton;
