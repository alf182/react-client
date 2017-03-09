import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Example from '../modules/Example';
import NotFound from '../components/Utils/NotFound';

function Pages() {
  return (
    <main role="application">
      <Switch>
        <Route
          path="/"
          exact
          component={Example}
        />
        <Route component={NotFound}/>
      </Switch>
    </main>
  );
}

export default Pages;
