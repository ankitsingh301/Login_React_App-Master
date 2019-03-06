import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import propTypes from "prop-types";
import { NotifyUser } from "../../actions/NotifyActions";
import Alert from "../Layout/Alert";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const { firebase, NotifyUser } = this.props;
    const { email, password } = this.state;
    firebase
      .login({
        email,
        password
      })
      .catch(err => NotifyUser("Invalid credentials", "error"));
  };
  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className="pb-4 text-center pt-3">
                <span className="text-dark">
                  <i className="fas fa-lock" />
                  Login
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email: </label>
                  <input
                    type="text"
                    value={this.state.email}
                    name="email"
                    onChange={this.onChange}
                    placeholder="enter your email address"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="text"
                    value={this.state.password}
                    name="password"
                    onChange={this.onChange}
                    placeholder="enter your password"
                    className="form-control"
                    required
                  />
                </div>

                <input
                  type="submit"
                  value="Login"
                  className="btn btn-dark btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  firebase: propTypes.object.isRequired,
  notify: propTypes.object.isRequired,
  notifyUser: propTypes.func.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { NotifyUser }
  )
)(Login);
