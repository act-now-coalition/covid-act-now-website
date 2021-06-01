import React from 'react';
import VaccineButton from './VaccineButton';
import ShareButtons from 'components/SharedComponents/ShareButtons';
import { EventCategory } from 'components/Analytics';
import { Region } from 'common/regions';

const HeaderButtons: React.FC<{ region: Region; onClickShare: () => void }> = ({
  region,
  onClickShare,
}) => {
  const shareUrl = region.canonicalUrl;
  const shareQuote = `I'm keeping track of ${region.fullName}'s vaccination progress and COVID risk level data with @CovidActNow. What does your community look like?`;
  return (
    <div style={{ display: 'flex' }}>
      <ShareButtons
        eventCategory={EventCategory.ENGAGEMENT}
        shareUrl={shareUrl}
        shareQuote={shareQuote}
        region={region}
        isLocationPageHeader={true}
      />
      <VaccineButton />
    </div>
  );
};

export default HeaderButtons;
