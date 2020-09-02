import { init } from '@ilmtest/ilmtest-sdk-js';
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import axios from 'redaxios';
import './app.global.css';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () => {
  init(1, process.env.API_PATH, axios);

  // eslint-disable-next-line global-require
  const Root = require('./containers/Root').default;
  render(
    <AppContainer>
      <Root />
    </AppContainer>,
    document.getElementById('root')
  );
});
