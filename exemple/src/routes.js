import { handleLogin, handleAuthentication, logout } from 'redux-auth0';
import { SignInContainer, SignUpContainer } from './Components/Authentication';
import Private from './Components/Private';


export default {
  SIGNIN: {
    path: '/',
    Component: SignInContainer,
  },
  SIGNUP: {
    path: '/signup',
    Component: SignUpContainer,
  },
  PRIVATE: {
    path: '/private',
    Component: Private,
  },
  AUTHORIZE: {
    path: '/authorization',
    thunk: async (dispatch) => {
      try {
        const authResult = await handleAuthentication();

        dispatch(handleLogin(authResult));
        dispatch({ type: 'PRIVATE' });
      } catch (error) {
        // todo handle error
      }
    },
  },
  LOGOUT: {
    path: '/logout',
    thunk: async (dispatch) => {
      try {
        dispatch(logout());
        dispatch({ type: 'SIGNIN' });
      } catch (error) {
        // todo handle error
      }
    },
  },
};
