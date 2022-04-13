import React from 'react';
import SocialLocationPreviewMap from './SocialLocationPreviewMap';

export default {
  title: 'Components/SocialLocationPreviewMap',
  component: SocialLocationPreviewMap,
};

export const CommunityLevelsMap = () => {
  return (
    <div style={{ width: 600 }}>
      <SocialLocationPreviewMap isRiskMap />
    </div>
  );
};
