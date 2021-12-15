import React, { useContext, useState } from "react";
import { When } from "react-if";

import { LoginContext } from "./contex/context.login.js";

// refactor to function :

export default function Login(props) {
  const contextType = useContext(LoginContext);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  //  handle form functions :

  const handleChangeName = (e) => {
    setUsername(e.target.value);
    // setPassword(e.target.password.value)
  };
  const handleChangePassword = (e) => {
    // setUsername(e.target.value);
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    contextType.login(username, password);
    console.log("hi");
  };
  return (
    <>

      <When condition={!contextType.loggedIn}>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="UserName"
            name="username"
            onChange={handleChangeName}
          />
          <input
            placeholder="password"
            name="password"
            onChange={handleChangePassword}
          />
          <button type="submit">Login</button>
        </form>
      </When>
    </>
  );
}
