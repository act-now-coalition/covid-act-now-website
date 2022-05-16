import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import React, { useState } from 'react';
import {
  ColumnCentered,
  HomePageBlock,
  HomePageBlockHeader,
  HomePageBlockSubtitle,
  Row,
  MapSubitemsWrapper,
  TableWrapper,
} from './HomePage.style';
import LocationToggle from './LocationToggle';
import { MapView } from './utils';
import { getUrlAndShareQuote } from 'components/ShareBlock/ShareModelBlock';
import ShareButtons from 'components/SharedComponents/ShareButtons';

interface MapBlockProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  renderMap: (locationScope: MapView) => React.ReactElement;
  renderThermometer: () => React.ReactElement;
  renderTable?: (locationScope: MapView) => React.ReactElement;
  infoLink: React.ReactElement;
}

export const MapBlock: React.FC<MapBlockProps> = ({
  title,
  subtitle,
  renderMap,
  renderTable,
  renderThermometer,
  infoLink,
}) => {
  const [locationScope, setLocationScope] = useState(MapView.COUNTIES);
  const onToggle = (
    event: React.MouseEvent<HTMLElement>,
    newSelection: MapView,
  ) => {
    if (newSelection) {
      setLocationScope(newSelection);
      trackEvent(
        EventCategory.MAP,
        EventAction.SELECT,
        `Select: ${locationScope}`,
      );
    }
  };

  const { displayName, shareURL } = getUrlAndShareQuote();
  const shareQuote = `I'm keeping track of ${displayName}'s vaccination progress and COVID risk level data with @CovidActNow. What does your community look like?`;

  return (
    <HomePageBlock>
      <ColumnCentered>
        <HomePageBlockHeader>{title}</HomePageBlockHeader>
        <HomePageBlockSubtitle>{subtitle}</HomePageBlockSubtitle>
        <LocationToggle locationScope={locationScope} onChange={onToggle} />
        {renderMap(locationScope)}
        <MapSubitemsWrapper>
          {renderThermometer()}
          {renderTable && (
            <TableWrapper>{renderTable(MapView.STATES)}</TableWrapper>
          )}
          <Row>
            {infoLink}
            <ShareButtons
              eventCategory={EventCategory.MAP}
              shareUrl={shareURL}
              shareQuote={shareQuote}
            />
          </Row>
        </MapSubitemsWrapper>
      </ColumnCentered>
    </HomePageBlock>
  );
};
