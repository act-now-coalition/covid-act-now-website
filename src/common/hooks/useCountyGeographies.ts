import { singletonHook } from 'react-singleton-hook';
import usePromise from './usePromise';
import { importCountyGeographies } from 'common/data';

const useCountyGeographies = singletonHook({ pending: true }, () =>
  usePromise(importCountyGeographies()),
);
export default useCountyGeographies;
