import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { LoginContext } from "./contex/context.login";
import { When } from "react-if";

export default function Header() {
  const contexType = useContext(LoginContext);

  return (
    <>
      {/* <When condition={contexType.loggedIn}>
     <button onClick={contexType.logout}>Log Out</button>
      </When> */}

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">To do</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/setting">Setting</Nav.Link>
          </Nav>
          <When condition={contexType.LoggedIn}>
            <button onClick={contexType.logout}>Log Out</button>
          </When>
        </Container>
      </Navbar>
    </>
  );
}
