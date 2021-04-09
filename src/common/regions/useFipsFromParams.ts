import React from 'react';
import { useParams } from 'react-router';
import { findStateByStateCode, FipsCode } from './types';

import {
  findStateFipsByUrlParams,
  findCountyFipsByUrlParams,
  findMetroAreaFipsByUrlParams,
} from './urlSegmentsToFips';

export const useFipsFromParams = (): FipsCode | null => {
  const {
    stateId,
    countyId,
    countyFipsId,
    metroAreaUrlSegment,
    fipsCode,
  } = useParams<{
    stateId?: string;
    countyId?: string;
    countyFipsId: string;
    metroAreaUrlSegment?: string;
    fipsCode?: string;
  }>();

  const fips = React.useMemo(() => {
    if (fipsCode) {
      return fipsCode;
    } else if (countyFipsId) {
      return countyFipsId;
    } else if (metroAreaUrlSegment) {
      return findMetroAreaFipsByUrlParams(metroAreaUrlSegment);
    } else if (!stateId) {
      return null;
    } else if (countyId) {
      // If the county param has a value but we can't find the county,
      // this will return null. If we want to fall back to state, do that here.
      return findCountyFipsByUrlParams(stateId, countyId);
    } else {
      return findStateFipsByUrlParams(stateId);
    }
  }, [stateId, countyId, countyFipsId, metroAreaUrlSegment, fipsCode]);

  return fips;
};
/*
import usePromise from 'common/hooks/usePromise';
import { importLocationPageProps } from 'common/data';
import { deserializeRegion } from './deserializeRegion';
  export const useLocationPageProps = (fips: string | null): any => {
    return usePromise(importLocationPageProps(fips));
  };
  
    const props = useLocationPageProps(fips); // import(`common/data/fips/${fips}.json`);
    if (props.region) {
      return deserializeRegion(props.region);
    }
    return null;
  };
    */
