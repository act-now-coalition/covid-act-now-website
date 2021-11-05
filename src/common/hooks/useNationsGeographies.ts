import { singletonHook } from 'react-singleton-hook';
import { importNationsGeographies } from 'common/data';
import usePromise from './usePromise';

const useCountyGeographies = singletonHook({ pending: true }, () =>
  usePromise(importNationsGeographies()),
);

export default useCountyGeographies;
