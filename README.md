## Redux Auth0 middleware

In the project directory, you can run:

### `yarn add redux-auth0`

(or `npm install redux-auth0`)

#### Initialise your store:

```javascript
import { combineReducers, applyMiddleware, compose } from 'redux';
import auth0 from 'redux-auth0';
````

```javascript
const { createStore: createStoreWithAuth0, middleware:auth0middleware, reducer: auth } = auth0({
  domain: 'your-domain.auth0.com',
  clientID: 'YOUR_CLIENT_ID',
  redirectUri: 'http://your-allowed/callback',
  audience: 'https://your-domain.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'token openid',
});
```

```javascript
const middlewares = [/*any middleware*/, auth0middleware];
```

```javascript
//Use redux-auth0 createStore
const store = createStoreWithAuth0(
    combineReducers({
      /* any reducer */
      auth,
    }),
    compose(
      /* any enhancers */
      applyMiddleware(...middlewares),
      /*...*/
  )
);

```

### Username password authentication 
```javascript
  store.dispatch(
    loginUsernamePassword({
        username: 'john.doe@mail.com',
        password: 'password',
        realm: 'YourAuth0Database',
        
        //optional action dispatched on user login:
        redirect: {type: 'ANY_ACTION'}
    })
  );
```

### Login with google
```javascript
  store.dispatch(socialConnection({ connection: 'google-oauth2'}));
```

On social connection success, you'll be redirected to the callback url configure above,
so you have to parse the url to recover your token.

For example, with redux-first-router, you will have something like so:

```javascript
  import { handleLogin, handleAuthentication } from 'redux-auth0';
```

```javascript
const routes = {
    PRIVATE_ROUTE: '/private',
    AUTHORIZE: {
        path: '/callback',
        thunk: async (dispatch) => {
          try {
            const authResult = await handleAuthentication();
    
            dispatch(handleLogin(authResult));
            dispatch({ type: 'PRIVATE_ROUTE' });
          } catch (error) {
            /* ... */
          }
        }
      },
  }
```

[fully functional example](https://github.com/flo-pereira/redux-auth0/tree/master/exemple)
