// @flow

import * as React from 'react';
import Link from 'redux-first-router-link';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor } from '../store';

export default ({ Component, payload, children }) => (
  <div className="container">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">SignIn</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">SignUp</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/private">Private</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
    <PersistGate persistor={persistor}>
      { Component && <Component {...payload} /> }
      { children }
    </PersistGate>
  </div>
);

