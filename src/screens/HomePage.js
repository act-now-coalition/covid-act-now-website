import React from 'react';

import Map from 'components/Map';

export default function HomePage() {
  return (
    <main style={{ textAlign: 'center', paddingBottom: 50 }}>
      <p>Click the map to see projections for your state.</p>
      <Map />
    </main>
  );
}
