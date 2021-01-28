import React, { Fragment } from 'react';
import RegionItem from './RegionItem';
import RegionItemSkeleton from './RegionItemSkeleton';
import { RegionItemsWrapper } from 'screens/HomePage/New/NewHomepage.style';
import { useGeolocation } from 'common/hooks';
import {
  getGeolocatedRegions,
  GeolocatedRegions,
  Region,
} from 'common/regions';

enum ItemsState {
  LOADING,
  READY,
  NOT_FOUND,
}

const HomepageItems: React.FC = () => {
  const { geolocationData, isLoading } = useGeolocation();
  const userRegions = geolocationData
    ? getGeolocatedRegions(geolocationData)
    : null;

  const itemsState = isLoading
    ? ItemsState.LOADING
    : geolocationData
    ? ItemsState.READY
    : ItemsState.NOT_FOUND;

  if (itemsState === ItemsState.NOT_FOUND) {
    return null;
  }

  const visibleRegions = userRegions ? getRegionList(userRegions) : [];

  return (
    <RegionItemsWrapper>
      {itemsState === ItemsState.LOADING && (
        <Fragment>
          <RegionItemSkeleton />
          <RegionItemSkeleton />
        </Fragment>
      )}
      {itemsState === ItemsState.READY && (
        <Fragment>
          {visibleRegions.map(region => (
            <RegionItem region={region} key={region.fipsCode} />
          ))}
        </Fragment>
      )}
    </RegionItemsWrapper>
  );
};

function getRegionList(geolocatedRegions: GeolocatedRegions): Region[] {
  const { county, state, metroArea } = geolocatedRegions;

  const items = [];

  if (metroArea) {
    items.push(metroArea);
  }

  if (county) {
    items.push(county);
  }

  if (state && items.length < 2) {
    items.push(state);
  }

  return items;
}

export default HomepageItems;
