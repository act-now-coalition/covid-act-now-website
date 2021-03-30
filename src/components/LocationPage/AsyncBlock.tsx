import React from 'react';
import { useCountyGeographies } from 'common/hooks';

const AsyncBlock: React.FC = () => {
  const { result, pending } = useCountyGeographies();

  if (pending || !result) {
    return <div>loading...</div>;
  }

  return <div>{result.objects.counties.geometries.length}</div>;
};

export default AsyncBlock;
