import types from './types';

export const socialConnexion = (options) => ({ type: types.SOCIAL_CONNECTION, options });
export const loginEmailPassword = ({ email, password, redirect, ...options }) => ({ type: types.LOGIN_EMAIL_PASSWORD, redirect, email, password, options });
export const handleLogin = ({ accessToken, idToken, expiresIn }) => ({
  type: types.LOGGED,
  accessToken,
  idToken,
  expiresIn,
});
export const loginError = (error) => ({ type: types.ERROR_LOGIN, error });
export const signup = ({ email, password, redirect, ...options }) => ({ type: types.SIGNUP, redirect, email, password, options });
export const signUpError = (error) => ({ type: types.ERROR_SIGNUP, error });
