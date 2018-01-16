// @flow

import auth0 from 'auth0-js';
import AuthError from './AuthError';
import type { Auth0Conf, RealmRequired, ConnectionRequired } from './TypeDefinitions';

export default class Auth0 {

  auth0: Object;

  constructor (config : Auth0Conf) {
    const { domain, clientID, redirectUri, audience, responseType, scope } = config;
    this.auth0 = new auth0.WebAuth({
      domain,
      clientID,
      redirectUri,
      audience,
      responseType,
      scope
    });
  }

  login = (username: string, password: string, options: RealmRequired):Promise<Object> => new Promise(
    (resolve, reject) => this.auth0.client.login({
        ...options,
      username,
      password,
    }, (err, result) => err ? reject(err) : resolve(result))
  );

  signup = (email: string, password: string, options: ConnectionRequired):Promise<Object> => new Promise(
    (resolve, reject) => this.auth0.signup({
      ...options,
      email,
      password
    }, (err) => {

      if (err) {
        return reject(err);
      }

      const { connection, ...otherOptions }  = options;

      resolve(this.login(email, password, { realm: connection, ...otherOptions }));
    })
  );

  socialConnection = (options: ConnectionRequired):Function => this.auth0.authorize(options);

  handleAuthentication = ():Promise<Object> => new Promise(
    (resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) {
          return reject(err);
        }

        if (authResult && authResult.accessToken && authResult.idToken) {
          return resolve(authResult);
        }

        throw new AuthError('Can\'t parse user informations', 400);
      });
    });
}