import Auth0 from './Auth0';
import reducer from './reducer';
import middleware from './middleware';
import { createStoreWithAuth0, secure, token, handleAuthentication } from './helpers';
import { socialConnexion, loginEmailPassword, handleLogin, loginError, signup, signUpError } from './actions';

import type { Auth0Conf } from 'TypeDefinitions';

let auth0;

export {
  auth0,
  socialConnexion,
  loginEmailPassword,
  handleLogin,
  loginError,
  signup,
  signUpError,
  secure,
  token,
  handleAuthentication,
};

export default (config: Auth0Conf) => {
  auth0 = new Auth0(config);

  return ({
    createStoreWithAuth0,
    reducer,
    middleware: middleware(auth0),
  });
}