import { LOGIN_EMAIL_PASSWORD, SIGNUP, SOCIAL_CONNECTION } from "./types";
import { loginError, handleLogin, signUpError } from './actions';

export default (auth0) => {

  return (store) => (next) => async (action) => {
    if (action.type === LOGIN_EMAIL_PASSWORD) {
      try {
        const authResult = await auth0.login(action.email, action.password, action.options);

        next(handleLogin(authResult));

        if (action.redirect) {
          return store.dispatch(action.redirect);
        }

        return next(action);
      } catch (error) {
        console.log(error);
        return next(loginError(error));
      }
    }

    if (action.type === SIGNUP) {
      try {
        const authResult = await auth0.signup(action.email, action.password, action.options);

        next(handleLogin(authResult));

        if (action.redirect) {
          return store.dispatch(action.redirect);
        }

        return next(action);

      } catch (error) {
        return next(signUpError(error));
      }
    }

    if (action.type === SOCIAL_CONNECTION) {
      return auth0.socialConnection(action.options);
    }

    return next(action);
  };
};
