import types from './types';

export const socialConnection = (options) => ({ type: types.SOCIAL_CONNECTION, options });
export const loginUsernamePassword = ({ username, password, redirect, ...options }) => ({ type: types.LOGIN_USERNAME_PASSWORD, redirect, username, password, options });
export const handleLogin = ({ accessToken, idToken, expiresIn }) => ({
  type: types.LOGGED,
  accessToken,
  idToken,
  expiresIn,
});
export const loginError = (error) => ({ type: types.ERROR_LOGIN, error });
export const signup = ({ email, password, redirect, ...options }) => ({ type: types.SIGNUP, redirect, email, password, options });
export const signUpError = (error) => ({ type: types.ERROR_SIGNUP, error });
