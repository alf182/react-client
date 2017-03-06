import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Empleados from '../modules/empleados/Example';

function Pages() {
  return (
    <main role="application">
      <Switch>
        <Route
          path="/"
          exact
          component={Example}
        />
      </Switch>
    </main>
  );
}

export default Pages;
