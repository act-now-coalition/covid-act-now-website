import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";

import ModelPage from './Model';
import Map from './Map';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/ca">
          <ModelPage />
        </Route>
        <Route path="/">
          <Map />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

