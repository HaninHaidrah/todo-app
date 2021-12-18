import React, { useContext } from "react";
import { When } from "react-if";

import { LoginContext } from "../contex/context.login.js";

export default function Auth(props) {
  const contextType = useContext(LoginContext);
  const isLoggedIn = contextType.LoggedIn;
  const canDo = props.capability ? contextType.can(props.capability) : true;
  const okToRender = isLoggedIn && canDo;

  return <When condition={okToRender}>{props.children}</When>;
}
