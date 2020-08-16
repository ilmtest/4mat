/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import GlobalState from './context/GlobalState';

export default function Routes() {
  return (
    <App>
      <GlobalState>
        <Switch>
          <Route path={routes.HOME} component={HomePage} />
        </Switch>
      </GlobalState>
    </App>
  );
}
