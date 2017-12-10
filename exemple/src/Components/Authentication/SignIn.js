import React, { PureComponent, Fragment } from 'react';
import './googlebtn.css';

export default class extends PureComponent {
  form = {};

  signInAction = (e) => {
    e.preventDefault();

    const { email, password } = this.form;

    if (email.value && password.value) {
      this.props.login(email.value, password.value);
    }
  };

  render() {
    return (
      <Fragment>
        <h1>Sign in</h1>
        <div className="row justify-content-md-center">
          <button className="loginBtn loginBtn-google" onClick={this.props.loginWithGoogle}>Login with Google</button>
        </div>
        <div className="row justify-content-md-center">
          Or
        </div>
        <div className="row justify-content-md-center">
          <form onSubmit={this.signInAction}>
            <div className="form-group">
              <input ref={(email) => { this.form.email = email; }} type="email" className="form-control" name="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <input ref={(password) => { this.form.password = password; }} type="password" className="form-control" name="password" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Sign In</button>
          </form>
        </div>
      </Fragment>
    );
  }
}

