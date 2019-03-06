import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const newClient = this.state;
    const { firestore, history } = this.props;
    if (newClient.balance === "") {
      newClient.balance = 0;
    }

    firestore
      .add({ collection: "clients" }, newClient)
      .then(() => history.push("/"));
  };
  render() {
    const { disableBalanceOnAdd } = this.props.settings;
    return (
      <div>
        <div className="row">
          <div className="col-mid-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back to Dashboard
            </Link>
          </div>
        </div>
        <div class="card">
          <div className="card-header">Add client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter your first Name"
                  name="firstName"
                  required
                  minLength="2"
                  onChange={this.onChange}
                  value={this.state.firstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter your last Name"
                  required
                  name="lastName"
                  minLength="2"
                  onChange={this.onChange}
                  value={this.state.lastName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter your email"
                  required
                  name="email"
                  minLength="2"
                  onChange={this.onChange}
                  value={this.state.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Enter your phone number"
                  name="phone"
                  required
                  minLength="2"
                  onChange={this.onChange}
                  value={this.state.phone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Ballance</label>
                <input
                  className="form-control"
                  type="number "
                  placeholder="Enter your balance"
                  name="balance"
                  required
                  minLength="0"
                  onChange={this.onChange}
                  value={this.state.balance}
                  disabled={disableBalanceOnAdd}
                />
              </div>

              <input
                type="submit"
                value="submit"
                className="btn btn-dark btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);
