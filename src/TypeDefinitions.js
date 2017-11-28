export type Auth0Conf = {
  domain: string,
  clientID: string,
  redirectUri: string,
  audience: string,
  responseType: string,
  scope: string,
};

export type ConnectionRequired = {
  connection: string,
};

export type RealmRequired = {
  realm: string,
};
