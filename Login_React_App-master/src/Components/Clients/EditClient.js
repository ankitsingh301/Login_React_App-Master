import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../Layout/spinner";

class EditClient extends Component {
  constructor(props) {
    super(props);
    // Create refs
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();

    const { client, firestore, history } = this.props;

    // Updated Client
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance:
        this.balanceInput.current.value === ""
          ? 0
          : this.balanceInput.current.value
    };

    // Update client in firestore
    firestore
      .update({ collection: "clients", doc: client.id }, updClient)
      .then(history.push("/"));
  };

  render() {
    const { client } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;
    if (client) {
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
                    ref={this.firstNameInput}
                    defaultValue={client.firstName}
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
                    ref={this.lastNameInput}
                    defaultValue={client.lastName}
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
                    ref={this.emailInput}
                    defaultValue={client.email}
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
                    ref={this.phoneInput}
                    defaultValue={client.phone}
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
                    ref={this.balanceInput}
                    defaultValue={client.balance}
                    disabled={disableBalanceOnEdit}
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
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings: settings
  }))
)(EditClient);
