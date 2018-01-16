import { AUTH0_STORE, LOGGED, ERROR_LOGIN, ERROR_SIGNUP, LOGOUT } from './types';

const INITIAL_STATE = {
  AUTH0_STORE,
  accessToken: null,
  idToken: null,
  expiresAt: null,
  error: null,
};

export default (state = INITIAL_STATE, { type, ...props }) => {
  switch (type) {
    case LOGGED:
      const expiresAt = JSON.stringify((props.expiresIn * 1000) + new Date().getTime());
      return ({ ...state, ...props, expiresAt, error: null });
    case ERROR_LOGIN:
    case ERROR_SIGNUP:
      return ({ ...state, ...props });
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};