import React from 'react';
import SocialLocationPreviewMap from './SocialLocationPreviewMap';

export default {
  title: 'Components/SocialLocationPreviewMap',
  component: SocialLocationPreviewMap,
};

// const SocialLocationPreview = (props: {
//   border?: boolean;
//   isEmbed?: boolean;
//   isRiskMap?: boolean;
//   Footer?: ComponentType;
//   isEmbedPreview?: boolean;
// }) => {
export const CommunityLevelsMap = () => {
  return (
    <div style={{ width: 600 }}>
      <SocialLocationPreviewMap isRiskMap />
    </div>
  );
};
