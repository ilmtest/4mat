import React from 'react';
import { hot } from 'react-hot-loader/root';
import { MemoryRouter } from 'react-router';
import Routes from '../Routes';

const Root = () => (
  <MemoryRouter>
    <Routes />
  </MemoryRouter>
);

export default hot(Root);
