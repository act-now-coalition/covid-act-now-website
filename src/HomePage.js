import React from 'react';
import './App.css'; /* optional for styling like the :hover pseudo-class */

import Map from './Map';

export default function HomePage() {
  return (
    <main style={{textAlign: 'center', paddingBottom: 50}}>
      <p>Click the map to see projections for your state.</p>
      <Map />
    </main>
  );

}