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

interface MapBlockProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  renderMap: (locationScope: MapView) => React.ReactElement;
  renderThermometer: () => React.ReactElement;
  renderTable?: (locationScope: MapView) => React.ReactElement;
  infoLink: React.ReactElement;
  mapDescription?: React.ReactElement;
}

export const MapBlock: React.FC<MapBlockProps> = ({
  title,
  subtitle,
  renderMap,
  renderTable,
  renderThermometer,
  infoLink,
  mapDescription,
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

  return (
    <HomePageBlock>
      <ColumnCentered>
        <HomePageBlockHeader>{title}</HomePageBlockHeader>
        {subtitle && <HomePageBlockSubtitle>{subtitle}</HomePageBlockSubtitle>}
        {mapDescription}
        <LocationToggle locationScope={locationScope} onChange={onToggle} />
        {renderMap(locationScope)}
        <MapSubitemsWrapper>
          {renderThermometer()}
          {renderTable && (
            <TableWrapper>{renderTable(MapView.STATES)}</TableWrapper>
          )}
          <Row>{infoLink}</Row>
        </MapSubitemsWrapper>
      </ColumnCentered>
    </HomePageBlock>
  );
};
