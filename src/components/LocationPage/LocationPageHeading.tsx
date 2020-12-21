import React from 'react';
import { Region, State, County, MetroArea } from 'common/regions';
import { startCase } from 'lodash';
import * as Styles from './LocationPageHeading.style';

const LocationPageHeading: React.FC<{
  region: Region;
  isEmbed: boolean;
}> = ({ region, isEmbed }) => {
  if (region instanceof State) {
    return (
      <Styles.Container>
        <Styles.HeaderTitle $isEmbed={isEmbed}>
          <strong>{region.name}</strong>
        </Styles.HeaderTitle>
      </Styles.Container>
    );
  } else if (region instanceof County) {
    const stateUrl = `${isEmbed ? '/embed' : ''}/us/${
      region.state.relativeUrl
    }`;
    return (
      <Styles.Container>
        <Styles.HeaderTitle $isEmbed={isEmbed}>
          <strong>{region.name}</strong>
          {', '}
          <Styles.HeaderStateCode>
            <a href={stateUrl}>{region.state.stateCode}</a>
          </Styles.HeaderStateCode>
        </Styles.HeaderTitle>
      </Styles.Container>
    );
  } else if (region instanceof MetroArea) {
    return (
      <Styles.Container>
        <Styles.HeaderTitle $isEmbed={isEmbed}>
          <strong>{startCase(region.fullName)}</strong>
          {', '}
          <Styles.HeaderStateCode>{region.stateCodes}</Styles.HeaderStateCode>
        </Styles.HeaderTitle>
        <Styles.HeaderSubtitle>{region.name}</Styles.HeaderSubtitle>
      </Styles.Container>
    );
  } else {
    return null;
  }
};

export default LocationPageHeading;
