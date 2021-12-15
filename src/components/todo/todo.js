import React, { useEffect, useState, useContext } from "react";
import useForm from "../../hook/form";
import Form from "./Form/form";
import List from "./List/list";
import "./todo.scss";
import { LoginContext } from "../contex/context.login";
import { When } from "react-if";
import Login from "../Login";
import Auth from "../Auth/auth";
import { v4 as uuid } from "uuid";

const ToDo = () => {
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
  const contexType = useContext(LoginContext);

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
      <When condition={!contexType.loggedIn}>
        <Login />
      </When>
      <When condition={contexType.loggedIn}>
        <header style={{ width: "1000px", margin: "0 auto" }}>
          <nav
            className="bp3-navbar .modifier "
            style={{ color: "white", backgroundColor: "#4C3F91" }}
          >
            <h2
              style={{
                marginTop: "5%",
                padding: "2%",
              }}
            >
              To Do List: ({incomplete})
            </h2>
          </nav>
        </header>
        <div className="container">
          <Form handleSubmit={handleSubmit} handleChange={handleChange} />
          <Auth capability="read">
            <List
              list={list}
              toggleComplete={toggleComplete}
              deleteItem={deleteItem}
            />
          </Auth>
        </div>
      </When>
    </>
  );
};

export default ToDo;
