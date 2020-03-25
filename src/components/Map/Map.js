import React, { useCallback, useEffect, useState } from 'react';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import USAMap from 'react-usa-map';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {
  STATES,
  STATE_TO_INTERVENTION,
  INTERVENTION_COLOR_MAP,
  INTERVENTION_DESCRIPTIONS,
  INTERVENTION_EFFICACY_ORDER_ASC,
} from 'enums';
import { Legend, LegendItem } from './Legend';
import {
  LocatingText,
  MapInstruction,
  MapInstructionMobile,
} from './Map.style';

const ROULETTE_LOADING_INTERVAL = 200;

function Map() {
  let [redirectTarget, setRedirectTarget] = useState();
  let [highlightedState, setHighlightedState] = useState();
  let [isLocating, setIsLocating] = useState(false);
  let [seeMyStateButtonHidden, setSeeMyStateButtonHidden] = useState(true);
  let [geolocatedStateCode, setGeolocatedStateCode] = useState(null);

  const reverseGeocoder = new window.BDCReverseGeocode();

  const fetchStateCode = useCallback(() => {
    function reverseGeocodeStateFromLocation(position) {
      return new Promise((resolve, reject) => {
        reverseGeocoder.getClientLocation(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          function (result) {
            if (!result) {
              reject();
              return;
            }
            resolve(result);
          },
        );
      });
    }

    return new Promise((resolve, reject) => {
      getClientLocation()
        .then(reverseGeocodeStateFromLocation)
        .then(geocodeResult => {
          const stateName = geocodeResult.principalSubdivision;
          const stateCode = Object.keys(STATES).find(
            key => STATES[key] === stateName,
          );
          setGeolocatedStateCode(stateCode);
          resolve(stateCode);
        })
        .catch(error => {
          setIsLocating(false);
          setHighlightedState(null);
          setSeeMyStateButtonHidden(true);
        });
    });
  }, [reverseGeocoder]);

  useEffect(() => {
    function checkLocationPermission() {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function (result) {
          switch (result.state) {
            case 'granted':
              fetchStateCode();
              setSeeMyStateButtonHidden(false);
              break;
            case 'denied':
              setSeeMyStateButtonHidden(true);
              break;
            default:
              setSeeMyStateButtonHidden(false);
          }
        });
    }
    checkLocationPermission();

    let rouletteAnimationTimer = null;
    if (isLocating) {
      const animationInterval = ROULETTE_LOADING_INTERVAL;
      rouletteAnimationTimer = setInterval(() => {
        const stateKeys = Object.keys(STATES);
        const keyIndex = Math.floor(Math.random() * stateKeys.length);
        setHighlightedState(stateKeys[keyIndex]);
      }, animationInterval);
    } else {
      clearTimeout(rouletteAnimationTimer);
    }
    return () => {
      clearTimeout(rouletteAnimationTimer);
    };
  }, [isLocating, fetchStateCode]);

  if (redirectTarget) {
    return <Redirect push to={redirectTarget} />;
  }

  const legendConfig = {};

  const statesCustomConfig = Object.keys(STATES).reduce((config, currState) => {
    const intervention = STATE_TO_INTERVENTION[currState];
    const interventionColor = INTERVENTION_COLOR_MAP[intervention];

    if (!legendConfig[intervention]) {
      legendConfig[intervention] = true;
    }

    return {
      ...config,
      [currState]: {
        fill: `${
          currState === highlightedState
            ? `${interventionColor.slice(0, -1)},0.5)`
            : interventionColor
        }`,
        clickHandler: event => {
          setRedirectTarget(`/state/${currState}`);
        },
      },
    };
  }, {});

  function seeMyStateButtonHandler() {
    setIsLocating(true);

    if (geolocatedStateCode) {
      setRedirectTarget(`/state/${geolocatedStateCode}`);
      return;
    }

    fetchStateCode().then(stateCode =>
      setRedirectTarget(`/state/${stateCode}`),
    );
  }

  function getClientLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: false,
      });
    });
  }

  function mobileMapInstruction() {
    const tapInstruction = `${
      seeMyStateButtonHidden ? 'Tap' : ' or tap'
    } the map to see projections`;
    return [
      !seeMyStateButtonHidden && (
        <span className="stateLink" onClick={seeMyStateButtonHandler}>
          See your state
        </span>
      ),
      <span> {tapInstruction} </span>,
    ];
  }

  return (
    <div className="Map">
      <MapInstruction>
        Click the map to see projections for your state
      </MapInstruction>
      <MapInstructionMobile>
        {isLocating ? (
          <LocatingText>Locating...</LocatingText>
        ) : (
          mobileMapInstruction()
        )}
      </MapInstructionMobile>
      <Grid container spacing={2}>
        <Grid item xs="12" md="8">
          <USAMap width="100%" height="auto" customize={statesCustomConfig} />
        </Grid>
        <Grid item xs="12" md="4">
          <Legend>
            {INTERVENTION_EFFICACY_ORDER_ASC.filter(
              intervention => legendConfig[intervention],
            ).map(intervention => (
              <LegendItem
                title={intervention}
                color={INTERVENTION_COLOR_MAP[intervention]}
                description={INTERVENTION_DESCRIPTIONS[intervention]}
              />
            ))}
          </Legend>
        </Grid>
      </Grid>
    </div>
  );
}

export default Map;
