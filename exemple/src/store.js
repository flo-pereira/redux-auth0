import { connectRoutes } from 'redux-first-router';
import { applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import auth0 from 'redux-auth0';
import routes from './routes';

const history = createHistory({ basename: '/' });

const config = {
  key: 'primary',
  storage,
};

const {
  reducer: location,
  middleware: locationMiddleware,
  enhancer: locationEnhancer,
  initialDispatch,
} = connectRoutes(history, routes, {
  initialDispatch: false,
});

const { createStore: createStoreWithAuth0, middleware: auth0middleware, reducer: auth } = auth0({
  domain: 'your-domain.auth0.com',
  clientID: 'YOUR_CLIENT_ID',
  redirectUri: 'http://localhost:3000/authorization', // reduired authorization route
  audience: 'https://your-domain.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'token openid',
});

const middlewares = [locationMiddleware, auth0middleware];

const store = createStoreWithAuth0(
  persistCombineReducers(config, {
    location,
    auth,
  }),
  compose(
    locationEnhancer,
    applyMiddleware(...middlewares)
  )
);

const persistor = persistStore(store, null, initialDispatch);

export {
  store,
  persistor,
};

