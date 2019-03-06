import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";

import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from "../../actions/settingAction";

class settings extends Component {
  disableBalanceOnAddChange = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };
  disableBalanceOnEditChange = () => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };
  allowRegistrationChange = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };
  render() {
    const {
      allowRegistration,
      disableBalanceOnAdd,
      disableBalanceOnEdit
    } = this.props.settings;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" />
              {"  "}
              Back to dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Settings</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Allow Registration</label>
                {"  "} {"  "}
                <input
                  type="checkbox"
                  name="allowRegistration"
                  checked={!!allowRegistration}
                  onChange={this.allowRegistrationChange}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance on Add</label> {"  "}
                {"  "}
                <input
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  checked={!!disableBalanceOnAdd}
                  onChange={this.disableBalanceOnAddChange}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance on Edit</label> {"  "}
                {"  "}
                <input
                  type="checkbox"
                  name="disableBalanceOnEdit"
                  checked={!!disableBalanceOnEdit}
                  onChange={this.disableBalanceOnEditChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
settings.propTypes = {
  settings: propTypes.object.isRequired,
  setDisableBalanceOnAdd: propTypes.func.isRequired,
  setAllowRegistration: propTypes.func.isRequired,
  setDisableBalanceOnEdit: propTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(settings);
