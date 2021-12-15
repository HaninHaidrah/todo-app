import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import jwt from "jsonwebtoken";

const testUsers = {
  admin: {
    password: "password",
    name: "Administrator",
    role: "admin",
    capabilities: ["create", "read", "update", "delete"],
  },
  editor: {
    password: "password",
    name: "Editor",
    role: "editor",
    capabilities: ["read", "update"],
  },
  writer: {
    password: "password",
    name: "Writer",
    role: "writer",
    capabilities: ["create"],
  },
};

export const LoginContext = React.createContext();

export default function LoginProvider(props) {
  let [loggedIn, setloggedIn] = useState(false);
  let [user, setUser] = useState({ capabilities: [] });
  let [token, setToken] = useState("");

  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  };

  const login = (username, password) => {
    if (testUsers[username]) {
      const token = jwt.sign(
        testUsers[username],
        process.env.REACT_APP_SECRET || "2000"
      );
      validateToken(token);
      console.log(token, "toooooooooken");
    }
  };

  const logout = () => {
    setLoginState(false, null, {});
  };

  const validateToken = async (token) => {
    try {
      // let response= await (await superagent.post('https://houses--safe.herokuapp.com/signin')).set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`)
      let user = jwt.verify(token, process.env.REACT_APP_SECRET || "2000");
      console.log(token, "toooooooooken");
      setLoginState(true, token, user);
    } catch (e) {
      setLoginState(false, null, {});
      console.log("Token Validation Error", e);
    }
  };

  const setLoginState = (loggedIn, token, user) => {
    cookie.save("auth", token);
    setloggedIn(loggedIn);
    setToken(token);
    setUser(user);
  };

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    const token = qs.get("token") || cookieToken || null;
    validateToken(token);
  });

  const state = {
    loggedIn,
    login,
    logout,
    user,
    token,
    can,
  };

  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  );
}
