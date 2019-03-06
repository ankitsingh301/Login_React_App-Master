import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import propTypes from "prop-types";
import Spinner from "../Layout/spinner";
import classnames from "classnames";

class ClientDetailes extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ""
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  //Update balance
  balanceUpdate = e => {
    e.preventDefault();
    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;
    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    };

    //update in firestore
    firestore.update({ collection: "clients", doc: client.id }, clientUpdate);
  };
  onDeleteClick() {
    const { client, firestore, history } = this.props;

    firestore
      .delete({ collection: "clients", doc: client.id })
      .then(history.push("/"));
  }
  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceForm = " ";
    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceUpdate}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="balanceUpdateAmount"
              placeholder="Add new Ballance"
              value={balanceUpdateAmount}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                className="btn btn-outline-dark"
                value="update"
              />
            </div>
          </div>
        </form>
      );
    } else {
    }
    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" />
                Back to Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button
                  onClick={this.onDeleteClick.bind(this)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <h3 className="card-header">
              {client.firstName}
              {"  "}
              {client.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client Id:{"  "}{" "}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    {" "}
                    Ballance: {"  "}
                    <span
                      className={classnames({
                        "text-danger": client.balance > 10,
                        "text-success": client.balance < 10
                      })}
                    >
                      ${client.balance}
                    </span>
                    {"  "}
                    <small>
                      <a
                        href="#"
                        onClick={() =>
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate
                          })
                        }
                      >
                        <i className="fas fa-pencil-alt" />
                      </a>
                    </small>
                  </h3>
                  {balanceForm}
                </div>
              </div>
              <hr />
              <ul className="list-group">
                <li className="list-group-item">
                  Contact mail:{"  "}
                  {client.email}
                </li>
                <li className="list-group-item">
                  Contact phone:{"  "}
                  {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}
ClientDetailes.propTypes = {
  firestore: propTypes.object.isRequired
};
export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetailes);
