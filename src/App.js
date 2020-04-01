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
import Privacy from 'screens/Terms/Privacy';
import EndorsementsPage from 'screens/Endorsements/EndorsementsPage';
import About from 'screens/About/About';
import CompareModels from 'screens/CompareModels/CompareModels';
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
            <Route path="/state/:id" component={ModelPage} />
            <Route path="/faq" component={FAQ} />
            <Route path="/endorsements" component={EndorsementsPage} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/terms" component={Terms} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/compare" component={CompareModels} />
            {/* <Route path="/donate" component={ComingSoon} /> */}
            {/* /model is deprecated in favor of /faq */}
            <Route path="/model">
              <Redirect to="/faq" />
            </Route>
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
