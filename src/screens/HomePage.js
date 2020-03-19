import React from 'react';
import Header from 'components/Header/Header';

import Map from 'components/Map/Map';

export default function HomePage() {
  return (
    <>
      <Header />
      <main style={{ textAlign: 'center', paddingBottom: 50 }}>
        <div className="App" style={{ maxWidth: 900, margin: 'auto' }}>
          <p>Click the map to see projections for your state.</p>
          <Map />
        </div>
      </main>
    </>
  );
}
