import React from 'react';
import { Row, Wrapper, AboutLink } from './MapAccessories.style';
import ShareButtons from 'components/SharedComponents/ShareButtons';
import { EventCategory } from 'components/Analytics';
import { getUrlAndShareQuote } from 'components/ShareBlock/ShareModelBlock';

interface MapAccessoriesProps {
  renderThermometer: () => React.ReactElement;
  infoLink: string;
}

const MapAccessories: React.FC<MapAccessoriesProps> = ({
  renderThermometer,
  infoLink,
}) => {
  const { displayName, shareURL } = getUrlAndShareQuote();
  const shareQuote = `I'm keeping track of ${displayName}'s vaccination progress and COVID risk level data with @CovidActNow. What does your community look like?`;

  return (
    <Wrapper>
      {renderThermometer()}
      <Row>
        <AboutLink to={infoLink}>About this data</AboutLink>
        <ShareButtons
          eventCategory={EventCategory.MAP}
          shareUrl={shareURL}
          shareQuote={shareQuote}
        />
      </Row>
    </Wrapper>
  );
};

export default MapAccessories;
