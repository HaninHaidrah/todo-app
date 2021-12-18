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
  const [letStop, setletStop] = useState(0);
  const contexType = useContext(LoginContext);

  async function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    console.log(
      JSON.stringify({
        text: item.text,
        assignee: item.assignee,
        complete: item.complete,
        difficulty: item.difficulty,
      })
    );

    let response = await fetch("https://to-do-7.herokuapp.com/todo/items", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${contexType.token}`,
      },
      body: JSON.stringify({
        text: item.text,
        assignee: item.assignee,
        complete: item.complete,
        difficulty: item.difficulty,
      }),
    });

    const data = await response.json();
    console.log(data, "createdData");
    setList([...list, item]);
  }
  async function deleteItem(id) {
    let response = await fetch(
      `https://to-do-7.herokuapp.com/todo/items/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${contexType.token}`,
        },
      }
    );
    const data = await response.json();
    const items = list.filter((item) => item.id !== id);

    setList(items);
  }

  async function toggleComplete(selectedItem, id) {
    let response = await fetch(
      `https://to-do-7.herokuapp.com/todo/items/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${contexType.token}`,
        },
        body: JSON.stringify({
          complete: true,
        }),
      }
    );

    const data = await response.json();
    console.log(data,"updatedData")

    const items = list.map((item) => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  useEffect(async () => {
    // to get the data from database :
    // to stop rendering many times I will use a var called stop and put the set in if condition:

    if (letStop < 3 && contexType.LoggedIn) {
      let response = await fetch("https://to-do-7.herokuapp.com/todo/items", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${contexType.token}`,
        },
      });
      const data = await response.json();
      setList(data);
      setletStop(letStop + 1);
    }

    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list, contexType.LoggedIn]);

  return (
    <>
      <When condition={!contexType.LoggedIn}>
        <Login />
      </When>
      <When condition={contexType.LoggedIn}>
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
