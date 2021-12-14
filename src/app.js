import React from "react";
import Header from "./components/todo/Header";
import Settings from "./components/todo/contex/contex";
import ToDo from "./components/todo/todo";
import Setting from "./components/todo/Setting";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <>
        <Settings>
          <Router>
              <Switch>
                <Route path="/setting">
                  <Setting />
                </Route>
                <Route path="/">
                  <ToDo />
                </Route>
              </Switch>
          </Router>
        </Settings>
      </>
    );
  }
}
