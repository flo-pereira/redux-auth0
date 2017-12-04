import { createStore as createReduxStore } from 'redux';
import { auth0 } from './index';
import AuthError from './AuthError';

let auth0Key;
let store;

const _getAuth0State = (state) => {
  if (!auth0Key) {
    auth0Key = Object.keys(state).find((key) => ('AUTH0_STORE' in state[key]));
  }

  return state[auth0Key];
};

export const secure = (callback) => (...props) => {
  const auth0state = _getAuth0State(store.getState());

  if (new Date().getTime() < auth0state.expiresAt) {
    return callback(...props);
  }

  throw new AuthError('Not allow', 401);
};

export const token = () => {
  const auth0state = _getAuth0State(store.getState());

  if (!auth0state) {
    throw new AuthError('You are not entered in any secure area yet', 428);
  }

  return auth0state.idToken;
};

export const handleAuthentication = () => auth0.handleAuthentication();

export const request = (url, method = 'GET', headers, options) => fetch(url, {
  ...options,
  method,
  headers: new Headers({
    ...headers,
    Authorization: `Bearer ${token()}`,
  })
});

export const createStore = (reducers, middlewares) => {
  store = createReduxStore(
    reducers,
    middlewares,
  );

  return store;
};

