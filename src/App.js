import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import ModelPage from 'screens/ModelPage/ModelPage';
import HomePage from 'screens/HomePage/HomePage';
// import ComingSoon from 'screens/ComingSoon/ComingSoon';
import FAQ from 'screens/FAQ/FAQ';
import Contact from 'screens/Contact/Contact';
import Terms from 'screens/Terms/Terms';
import Endorsements from 'screens/Endorsements/Endorsements';
import About from 'screens/About/About';
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
            <Route exact path="/" component={HomePage} />
            <Route exact path="/state/:id" component={ModelPage} />
            <Route
              exact
              path="/state/:id/county/:countyId"
              component={ModelPage}
            />
            <Route path="/model" component={FAQ} />
            <Route path="/endorsements" component={Endorsements} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/terms" component={Terms} />
            {/* <Route path="/donate" component={ComingSoon} /> */}
            <Route path="/*">
              <Redirect to="/" />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </StylesProvider>
    </ThemeProvider>
  );
}
