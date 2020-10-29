import { feature } from 'topojson-client';
import { Topology, GeometryCollection } from 'topojson-specification';
import STATES_JSON from 'components/Map/data/states-10m.json';
import { geoContains } from 'd3-geo';

export function getCurrentLocation(onLocation: PositionCallback) {
  navigator.geolocation.getCurrentPosition(position => {
    onLocation(position);
  });
}

const states = feature(
  (STATES_JSON as unknown) as Topology,
  STATES_JSON.objects.states as GeometryCollection,
);

interface GeolocationPosition {
  latitude: number;
  longitude: number;
}

export function getState(position: GeolocationPosition) {
  const point: [number, number] = [position.longitude, position.latitude];
  const state = states.features.find(stateFeature => {
    // tslint:disable-next-line
    if (stateFeature.geometry) {
      const cont = geoContains(stateFeature.geometry, point);
      if (cont) {
        console.log(cont, stateFeature);
      }
    }
  });
}
