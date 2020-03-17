import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";

import ModelPage from './ModelPage';
import HomePage from './HomePage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ maxWidth: 900, margin: "auto" }}>
        <h1>Coronavirus Act Now</h1>
        <h3>
          Political Leaders, Public Health Officials: The only thing that
          matters right now is the speed of your response
        </h3>
        <Switch>
          <Route path="/ca">
            <ModelPage location="us-ca" locationName="California" />
          </Route>
          <Route path="/ak">
            <ModelPage location="alaska" locationName="Alaska" />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

