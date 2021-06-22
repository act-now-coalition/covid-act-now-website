import React from 'react';
import { Row, Wrapper, AboutLink, TableWrapper } from './MapAccessories.style';
import ShareButtons from 'components/SharedComponents/ShareButtons';
import { EventCategory } from 'components/Analytics';
import { getUrlAndShareQuote } from 'components/ShareBlock/ShareModelBlock';
import { MapView } from '../utils';

interface MapAccessoriesProps {
  renderThermometer: () => React.ReactElement;
  infoLink: string;
  renderTable?: (locationScope: MapView) => React.ReactElement;
  locationScope: MapView;
}

const MapAccessories: React.FC<MapAccessoriesProps> = ({
  renderThermometer,
  infoLink,
  renderTable,
  locationScope,
}) => {
  const { displayName, shareURL } = getUrlAndShareQuote();
  const shareQuote = `I'm keeping track of ${displayName}'s vaccination progress and COVID risk level data with @CovidActNow. What does your community look like?`;

  return (
    <Wrapper>
      {renderThermometer()}
      {renderTable && <TableWrapper>{renderTable(locationScope)}</TableWrapper>}
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
