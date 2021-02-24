import { singletonHook } from 'react-singleton-hook';
import usePromise from './usePromise';
import { importFipsToCcviMap } from 'common/data';

const useFipsToCcviMap = singletonHook({ pending: true }, () =>
  usePromise(importFipsToCcviMap()),
);
export default useFipsToCcviMap;
