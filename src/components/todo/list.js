import React,{useContext} from "react";
import { SettingsContext } from "./contex";
export default function List(props) {
  const settings = useContext(SettingsContext);



  return (
    <>
      {props.list.map((item) => (
        <div
          key={item.id}
          style={{
            width: "800px",
            margin: "30px",
            background: "#FFFCDC",
            padding: "20px",
            position: "absolute",
            top: "11%",
            right: "20%",
          }}
        >
          <p>{item.text}</p>
          <p>
            <small>Assigned to: {item.assignee}</small>
          </p>
          <p>
            <small>Difficulty: {item.difficulty}</small>
          </p>
          <div onClick={() => props.toggleComplete(item.id)}>
            Complete: {item.complete.toString()}
          </div>
          <hr />
        </div>
      ))}
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1">
              Previous
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
