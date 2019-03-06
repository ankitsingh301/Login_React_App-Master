import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";
import "./App.css";
import AppNavbar from "./Components/Layout/AppNavbar";
import Dashboard from "./Components/Layout/Dashboard";
import AddClient from "./Components/Clients/AddClient";
import ClientDetails from "./Components/Clients/ClientDetails";
import EditClient from "./Components/Clients/EditClient";
import Login from "./Components/Auth/Login";
import settings from "./Components/settings/settings";
import Register from "./Components/Auth/Register";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/client/add"
                  component={UserIsAuthenticated(AddClient)}
                />
                <Route
                  exact
                  path="/client/edit/:id"
                  component={UserIsAuthenticated(EditClient)}
                />
                <Route
                  exact
                  path="/client/:id"
                  component={UserIsAuthenticated(ClientDetails)}
                />
                <Route
                  exact
                  path="/Login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/register"
                  component={UserIsNotAuthenticated(Register)}
                />
                <Route
                  exact
                  path="/settings"
                  component={UserIsAuthenticated(settings)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
