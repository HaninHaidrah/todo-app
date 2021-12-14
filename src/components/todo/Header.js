import React from "react";
import {Navbar,Container,Nav} from "react-bootstrap"

export default function Header() {
  return (
    <>
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/home">To do</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/setting">Setting</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
    {/* <h1 style={{background:'black', textAlign:'center', color:'white'}}>TO DO </h1> */}
    </>
  )
}
