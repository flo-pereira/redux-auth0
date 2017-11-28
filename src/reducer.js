import { AUTH0_STORE, LOGGED, LOGOUT } from './types';

const INITIAL_STATE = {
  AUTH0_STORE,
  accessToken: null,
  idToken: null,
  expiresAt: null,
};

export default (state = INITIAL_STATE, { type, accessToken, idToken, expiresIn }) => {
  switch (type) {
    case LOGGED:
      const expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());
      return ({ ...state, accessToken, idToken, expiresAt });
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};