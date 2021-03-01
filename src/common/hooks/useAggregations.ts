import { singletonHook } from 'react-singleton-hook';
import usePromise from './usePromise';
import { importAggregations } from 'common/data';

const useAggregations = singletonHook({ pending: true }, () =>
  usePromise(importAggregations()),
);

export default useAggregations;
