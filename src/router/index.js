import React, { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { routes } from './routes';

const importedRoutes = routes.map(({ page }) => {
  return lazy(() =>
    import(`../pages/${page}`).then((module) => ({ default: module[page] })),
  );
});

const Router = ({ ...props }) => {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Switch>
          {routes.map(({ path, exact = true }, index) => (
            <Route
              key={index}
              exact={exact}
              path={`/${path}`}
              component={importedRoutes[index]}
            />
          ))}
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
