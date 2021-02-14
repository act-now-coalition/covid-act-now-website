import { render as renderApp } from './server';
import { routes as appRoutes } from './App';

export const render = (req, res) => {
  console.log('about to render: ', req.url);
  const html = renderApp(req.url);
  //console.log('html', html)
  res.json({ html });
};

export const routes = () => {
  return appRoutes(true).map(routeProps =>
    routeProps.path.replace(':sharedComponentId?', ''),
  );
  //return ['/', '/about'];
};
