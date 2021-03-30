import React, { Fragment } from 'react';
import RegionItem from './RegionItem';
import RegionItemSkeleton from './RegionItemSkeleton';
import { RegionItemsWrapper } from 'screens/HomePage/HomePage.style';
import { GeolocatedRegions, Region } from 'common/regions';

enum ItemsState {
  LOADING,
  READY,
  NOT_FOUND,
}

const HomepageItems: React.FC<{
  userRegions: GeolocatedRegions | null;
  isLoading: boolean;
  showMetro: boolean;
}> = ({ userRegions, isLoading, showMetro }) => {
  const itemsState = isLoading
    ? ItemsState.LOADING
    : userRegions
    ? ItemsState.READY
    : ItemsState.NOT_FOUND;

  if (itemsState === ItemsState.NOT_FOUND) {
    return null;
  }

  const visibleRegions = userRegions
    ? getRegionList(userRegions, showMetro)
    : [];

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

function getRegionList(
  geolocatedRegions: GeolocatedRegions,
  getMetro: boolean = true,
): Region[] {
  const { county, state, metroArea } = geolocatedRegions;
  const items = [];
  if (getMetro) {
    if (metroArea) items.push(metroArea);
    if (county) items.push(county);
    if (state && items.length < 2) items.push(state);
  } else {
    if (state) items.push(state);
    if (county) items.push(county);
    // Only show metro if at least one of state or county is unavailable.
    if (metroArea && items.length < 2) items.push(metroArea);
  }
  return items;
}

export default HomepageItems;
