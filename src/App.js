import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ModelPage from 'screens/ModelPage';
import HomePage from 'screens/HomePage';
// import ComingSoon from 'screens/ComingSoon/ComingSoon';
import AppBar from 'components/AppBar/AppBar';
import Footer from 'components/Footer/Footer';
import theme from 'assets/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <BrowserRouter>
          <AppBar />
            <Switch>
              {/* <Route path="/faq" component={ComingSoon} /> */}
              {/* <Route path="/about" component={ComingSoon} /> */}
              {/* <Route path="/donate" component={ComingSoon} /> */}
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
              <Route path="/mo">
                <ModelPage location="mo" locationName="Montana" />
              </Route>
              <Route path="/nm">
                <ModelPage location="nm" locationName="New Mexico" />
              </Route>
              <Route path="/ny">
                <ModelPage location="ny" locationName="New York" />
              </Route>
              <Route path="/or">
                <ModelPage location="or" locationName="Oregon" />
              </Route>
              <Route path="/tx">
                <ModelPage location="tx" locationName="Texas" />
              </Route>
              <Route path="/nv">
                <ModelPage location="nv" locationName="Nevada" />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          <Footer />
        </BrowserRouter>
      </StylesProvider>
    </ThemeProvider>
  );
}
