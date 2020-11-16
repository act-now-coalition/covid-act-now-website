import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ProductsLanding from './ProductsLanding';
// import ProductPage from './ProductPage';

const Products: React.FC = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <ProductsLanding />
      </Route>
      {/* <Route path={`${path}/:productId`}>
        <ProductPage />
      </Route> */}
    </Switch>
  );
};

export default Products;
