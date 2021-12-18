import React, { useContext } from "react";
import Settings from "./components/contex/contex";
import ToDo from "./components/todo/todo";
import Setting from "./components/setting-config/Setting";
import Header from "./components/Header";
import Login from "./components/Login";
import LoginProvider from "./components/contex/context.login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LoginContext } from "./components/contex/context.login";
import { When } from "react-if";

export default function App (){
    // console.log(this.contex);
    const contexType=useContext(LoginContext)

    return (
      <>
        <Settings>
          <LoginProvider>
            {/* <When condition={contexType.loggedIn}> */}
              {/* <Login /> */}
            {/* </When> */}
            {/* <When condition={!contexType.loggedIn}> */}
              <Header />
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
            {/* </When> */}
          </LoginProvider>
        </Settings>
      </>
    );
  }

