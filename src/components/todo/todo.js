import React, { useEffect, useState } from "react";
import useForm from "../../hook/form";
import Form from "./form";
import List from "./list";

import { v4 as uuid } from "uuid";

const ToDo = () => {
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <>
      <header style={{ width: "1000px", margin: "0 auto" }}>
        <nav
          className="bp3-navbar .modifier "
          style={{ color: "white", backgroundColor: "#040303" }}
        >
          <h1>To Do List: ({incomplete})</h1>
        </nav>
      </header>

      <Form handleSubmit={handleSubmit} handleChange={handleChange} />

      <List list={list} toggleComplete={toggleComplete} />
    </>
  );
};

export default ToDo;
