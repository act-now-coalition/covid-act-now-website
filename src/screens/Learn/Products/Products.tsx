import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ProductsLanding from './ProductsLanding';

// TODO (Chelsi): confirm whether or not we'll be using interior products pages (ProductPage.tsx)
// If not, delete that code and move Products content out of Learn

const Products: React.FC = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <ProductsLanding />
      </Route>
    </Switch>
  );
};

export default Products;
