import { singletonHook } from 'react-singleton-hook';
import usePromise from './usePromise';
import { importCountyToZipCodeMap } from 'common/data';

const useCountyToZipMap = singletonHook({ pending: true }, () =>
  usePromise(importCountyToZipCodeMap()),
);
export default useCountyToZipMap;
