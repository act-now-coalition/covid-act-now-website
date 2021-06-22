import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import React, { useState } from 'react';
import {
  ColumnCentered,
  HomePageBlock,
  HomePageBlockHeader,
  HomePageBlockSubtitle,
} from './HomePage.style';
import MapAccessories from './MapAccessories/MapAccessories';
import LocationToggle from './LocationToggle';
import { MapView } from './utils';

interface MapBlockProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  renderMap: (locationScope: MapView) => React.ReactElement;
  renderThermometer: () => React.ReactElement;
  renderTable?: (locationScope: MapView) => React.ReactElement;
  infoLink: string;
}

export const MapBlock: React.FC<MapBlockProps> = ({
  title,
  subtitle,
  renderMap,
  renderTable,
  renderThermometer,
  infoLink,
}) => {
  const [locationScope, setLocationScope] = useState(MapView.STATES);
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
        <HomePageBlockSubtitle>{subtitle}</HomePageBlockSubtitle>
        <LocationToggle locationScope={locationScope} onChange={onToggle} />
        {renderMap(locationScope)}
        <MapAccessories
          renderThermometer={renderThermometer}
          infoLink={infoLink}
          renderTable={renderTable && renderTable}
          locationScope={locationScope}
        />
      </ColumnCentered>
    </HomePageBlock>
  );
};
