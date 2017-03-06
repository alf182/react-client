import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Empleados from '../modules/empleados/container/Empleados';
import Detail from '../modules/empleados/container/EmpleadoDetail';

function Pages() {
  return (
    <main role="application">
      <Switch>
        <Route
          path="/"
          exact
          component={Empleados}
        />
        <Route
          path="/employee/:id"
          exact
          component={Detail}
        />
      </Switch>
    </main>
  );
}

export default Pages;
