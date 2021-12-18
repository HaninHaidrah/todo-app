import React, { useEffect, useState } from "react";
import superagent from "superagent";
import base64 from "base-64";
import cookie from "react-cookies";
import bcrypt from 'bcryptjs';

export const LoginContext = React.createContext();

export default function LoginProvider(props) {
  const API = "https://to-do-7.herokuapp.com";

  const [LoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ capabilities: [] });
  const [token, setToken] = useState("");

  const signUp = async(username, password, role) => {
    try {
      // let salt = bcrypt.genSaltSync(10);
      // let hashedPassword= bcrypt.hashSync(password, salt);
      // console.log(hashedPassword);
      const response = await fetch(`${API}/signup`, {
        method: "POST",
        headers:new Headers ({
          Accept: "application/json",
        }),
        body: JSON.stringify({
          "username": username,
          "password": password,
          "role": role,
        }),
      });
      const data = await response.json();
    } catch (err) {}
  };

  const loginFunction = async (username, password) => {
    try {
      const response = await fetch(`${API}/signin`, {
        method: "POST",
        headers: new Headers({
          Authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
        }),
      });
      const data = await response.json();

      validateMyToken(data.token);
    } catch (err) {}
  };
  const logoutFunction = () => {
    setLoggedIn(false);
    setUser({});
    cookie.remove("token");
  };

  const validateMyToken = async (token) => {
    try {
      const response = await fetch(`${API}/sign-in`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const capability = data.user.capabilities;

      setToken(token);
      setLoggedIn(true);
      setUser({ capabilities: capability });
      cookie.save("token", token);
    } catch (e) {
      setLoggedIn(false);
      setUser({});
      console.log("error.message");
    }
  };

  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  };
  useEffect(() => {
    // check the token
    const myTokenCookie = cookie.load("token");
    validateMyToken(myTokenCookie, user.capabilities);
  }, []);

  const state = {
    LoggedIn: LoggedIn,
    loginFunction: loginFunction,
    logout: logoutFunction,
    user: user,
    can: can,
    token: token,
    signUp:signUp
  };
  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  );
}
