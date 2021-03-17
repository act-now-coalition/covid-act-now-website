import { singletonHook } from 'react-singleton-hook';
import { importCountyGeographies } from 'common/data';
import usePromise from './usePromise';

const useCountyGeographies = singletonHook({ pending: true }, () =>
  usePromise(importCountyGeographies()),
);

export default useCountyGeographies;
