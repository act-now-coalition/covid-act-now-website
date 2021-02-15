import { render as renderApp } from './server';
import { routes as appRoutes } from './App';
import regions from './common/regions/region_db';

export const render = (req, res) => {
  const html = renderApp(req.url);
  res.json({ html });
};

// cut down rendering time during prototyping by just doing one state
const california = 'california-ca';
const stateIds = regions.states
  .filter(s => s.urlSegment === california)
  .map(s => s.urlSegment);
const countyIds = regions.counties
  .filter(c => c.state.urlSegment === california)
  .map(c => c.urlSegment);
const countyFipsIds = regions.counties
  .filter(c => c.state.urlSegment === california)
  .map(c => c.fipsCode);
const metroAreaUrlSegments = regions.metroAreas.map(r => r.urlSegment);
const fipsCodes = countyFipsIds; /*regions.all()
  .filter(r => r.state?.urlSegment === california)
  .map(r => r.fipsCode); */

/**
 * Parse paths and extract location params for static generation
 */
const locationParams: { [index: string]: string[] } = {
  stateId: stateIds,
  countyId: countyIds,
  countyFipsId: countyFipsIds,
  metroAreaUrlSegment: metroAreaUrlSegments,
  fipsCode: fipsCodes,
};
const explodeLocationParams = (path: string): string[] => {
  console.log('---------------------------');
  console.log('exploding:', path);
  let paths: string[] = [path];
  // skip exploding paths that have no params
  if (path.indexOf(':') !== -1) {
    // each pass will remove any matching paths and append that path with the matching parameter
    // replaced for each possible valid value of that parameter
    Object.entries(locationParams).forEach(entry => {
      const [param, ids] = entry;
      const newPaths: string[] = [];
      const routeParam = `:${param}`;
      //console.log('locationParam:', param)
      //console.log('routeParam:', routeParam)
      // regex to match Route param syntax.
      // TODO: find an official function that will do this, like useParams, but working in node
      const paramRegex = new RegExp(routeParam);
      //.log('regex:', paramRegex)
      paths.forEach(path => {
        //console.log('path:', path)
        if (paramRegex.test(path)) {
          //console.log('matches regex')
          ids.forEach(id => {
            const newPath = path.replace(routeParam, id);
            console.log('newPath:', newPath);
            newPaths.push(newPath);
          });
        } else {
          //console.log('does not match regex')
          newPaths.push(path);
        }
      });
      paths = newPaths;
    });
  }
  return paths;
};

const isSsr = (props: any): boolean => !Boolean(props.noSsr);
const stripSharedComponentId = (path: string): string => {
  return path.replace(':sharedComponentId?', '');
};
const getPath = (props: any): string => props.path;
export const routes = () => {
  const ssrRoutes = appRoutes(true).filter(isSsr); //.filter(p => p.path.indexOf(':') != -1);
  const ssrPaths = ssrRoutes.map(getPath).map(stripSharedComponentId);
  // explodeLocationParams takes a string and returns an array of valid params based on location data
  const explodedPaths = ssrPaths.map(explodeLocationParams);
  // it's now an array of arrays of strings, so we have to flatten it.
  const fullPaths = [].concat.apply([], explodedPaths);
  // we've observed duplicate values here, so unique-ify so we don't bother generating more than once.
  return [...new Set(fullPaths)];
};
