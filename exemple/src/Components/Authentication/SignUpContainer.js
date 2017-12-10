import { connect } from 'react-redux';
import { signup } from 'redux-auth0';
import SignUp from './SignUp';

const mapDispatchToProps = (dispatch) => ({
  signup: (email, password) => dispatch(signup({
    email, password, connection: 'YOUR_AUTH0_DATABASE', redirect: { type: 'PRIVATE' },
  })),
});

export default connect(() => ({}), mapDispatchToProps)(SignUp);
