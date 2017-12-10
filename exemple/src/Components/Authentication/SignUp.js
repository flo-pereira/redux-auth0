import React, { PureComponent, Fragment } from 'react';

export default class extends PureComponent {
  form = {};

  checkValidity = () => {
    const { password, confirm } = this.form;

    if (password.value !== confirm.value) {
      confirm.setCustomValidity("Passwords Don't Match");
      confirm.focus();

      return false;
    }
    confirm.setCustomValidity('');


    return true;
  };

  signUpAction = (e) => {
    e.preventDefault();

    const { email, password, confirm } = this.form;

    if (email.value && password.value && confirm.value) {
      if (this.checkValidity()) {
        this.props.signup(email.value, password.value);
      }
    }
  };

  render() {
    return (
      <Fragment>
        <h1>Sign up</h1>
        <div className="row justify-content-md-center">
          <form onSubmit={this.signUpAction}>
            <div className="form-group">
              <input ref={(email) => { this.form.email = email; }} type="email" className="form-control" name="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <input ref={(password) => { this.form.password = password; }} type="password" name="password" className="form-control" placeholder="Password" />
            </div>
            <div className="form-group">
              <input ref={(confirm) => { this.form.confirm = confirm; }} type="password" className="form-control" placeholder="Confirm" onChange={this.checkValidity} />
            </div>
            <button type="submit" className="btn btn-primary">Sign In</button>
          </form>
        </div>
      </Fragment>
    );
  }
}
