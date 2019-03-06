import React, { Component } from "react";
import Clients from "../Clients/Clients";
import Sidebar from "../Layout/Sidebar";

class Dashboard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-10">
          <Clients />
        </div>
        <div className="col-md-2">
          <Sidebar />
        </div>
      </div>
    );
  }
}

export default Dashboard;
