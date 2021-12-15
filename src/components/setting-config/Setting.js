import React, { useContext, useState } from "react";
import Header from "../Header";
import { Form, Card, Button } from "react-bootstrap";
import { SettingsContext } from "../contex/contex";

export default function Setting() {
  const settings = useContext(SettingsContext);

  function handleSubmit(e) {
    e.preventDefault();
    settings.handleChangeNum(e.target.NumItem.value);
    console.log(settings.numOfItems, "value", settings);

    let data = {
      numOfItems: e.target.NumItem.value,
      display:e.target.display.checked
    };
    localStorage.setItem("configStting", JSON.stringify(data));
  }
  return (
    <>
      <Card className="text-center">
        <Card.Header>Edit Setting</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>number of Items per page </Form.Label>
              <Form.Control
                type="number"
                placeholder="from 1-5 "
                name="NumItem"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Display completed Items" name="display"/>
            </Form.Group>
            <Button type="submit">sumbit</Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
    </>
  );
}
