import React, { useState } from "react";
import Header from "./Header";
import { Form, Card } from "react-bootstrap";

export default function Setting() {
  const [value, setValue] = useState(0);

  function handleValueChange(e) {
    let num = Number(e.target.name);
    setValue(num);
    
    console.log(value);
  }

  return (
    <>
      <Header />
      <Card className="text-center">
        <Card.Header>Edit Setting</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              onChange={handleValueChange}
            >
              <Form.Label>number of Items per page </Form.Label>
              <Form.Check inline label="1" name="1" />
              <Form.Check inline label="2" name="2" />
              <Form.Check inline label="3" name="3" />
              <Form.Check inline label="4" name="4" />
              <Form.Check inline label="5" name="5" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Display completed Items" />
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
    </>
  );
}
