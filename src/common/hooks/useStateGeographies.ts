import { singletonHook } from 'react-singleton-hook';
import { importStateGeographies } from 'common/data';
import usePromise from './usePromise';

const useStateGeographies = singletonHook({ pending: true }, () =>
  usePromise(importStateGeographies()),
);

export default useStateGeographies;
