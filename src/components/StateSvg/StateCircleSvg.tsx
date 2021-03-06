import React, { lazy, Suspense } from 'react';

const StateCircleSvg = ({
  state,
  ratio,
  fillColor,
}: {
  state: string | null;
  ratio: number;
  fillColor: string;
}) => {
  const Circle = lazy(() => import('./Circle'));
  return state ? (
    <Suspense fallback="...Loading">
      <Circle ratio={ratio} state={state} fillColor={fillColor} />
    </Suspense>
  ) : null;
};

export default StateCircleSvg;
