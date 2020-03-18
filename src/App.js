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
        <h3 style={{ color: "red" }}>
          This model is intended to help make fast decisions, not predict the
          future
        </h3>
        <Switch>
          <Route path="/ca">
            <ModelPage location="ca" locationName="California" />
          </Route>
          <Route path="/ak">
            <ModelPage location="ak" locationName="Alaska" />
          </Route>
          <Route path="/fl">
            <ModelPage location="fl" locationName="Florida" />
          </Route>
          <Route path="/co">
            <ModelPage location="co" locationName="Colorado" />
          </Route>
          <Route path="/wa">
            <ModelPage location="wa" locationName="Washington" />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

