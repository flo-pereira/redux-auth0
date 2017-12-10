import { connect } from 'react-redux';
import { loginUsernamePassword, socialConnection } from 'redux-auth0';
import SignIn from './SignIn';

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(loginUsernamePassword({
    username, password, realm: 'YOUR_AUTH0_DATABASE', redirect: { type: 'PRIVATE' },
  })),
  loginWithGoogle: () => dispatch(socialConnection({ connection: 'google-oauth2' })),
});

export default connect(() => ({}), mapDispatchToProps)(SignIn);
