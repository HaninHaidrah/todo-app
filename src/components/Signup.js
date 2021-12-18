import React, { useContext, useState } from "react";
import { When } from "react-if";

import { LoginContext } from "./contex/context.login.js";

// refactor to function :

export default function Login(props) {
  const contextType = useContext(LoginContext);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("user");

  //  handle form functions :

  const handleChangeName = (e) => {
    setUsername(e.target.value);
    // setPassword(e.target.password.value)
  };
  const handleChangePassword = (e) => {
    // setUsername(e.target.value);
    setPassword(e.target.value);
  };
  const handleChangeRole = (e) => {
    // setUsername(e.target.value);
    setRole(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    contextType.signUp(username, password, role);
    console.log("welcome");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="UserName"
          name="username"
          onChange={handleChangeName}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChangePassword}
        />
        <input placeholder="role" name="role" onChange={handleChangeRole} />
        <button type="submit">sign up</button>
      </form>
    </>
  );
}
