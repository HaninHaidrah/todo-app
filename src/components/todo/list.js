// import React,{useContext} from "react";
// import { SettingsContext } from "./contex";
// import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
// export default function List(props) {
//   const settings = useContext(SettingsContext);

//   return (
//     <>
//       {props.list.map((item) => (
//         <div
//           key={item.id}
//           style={{
//             width: "800px",
//             margin: "30px",
//             background: "#FFFCDC",
//             padding: "20px",
//             position: "absolute",
//             top: "11%",
//             right: "20%",
//           }}
//         >
//           <p>{item.text}</p>
//           <p>
//             <small>Assigned to: {item.assignee}</small>
//           </p>
//           <p>
//             <small>Difficulty: {item.difficulty}</small>
//           </p>
//           <div onClick={() => props.toggleComplete(item.id)}>
//             Complete: {item.complete.toString()}
//           </div>
//           <hr />
//         </div>
//       ))}
//       <nav aria-label="Page navigation example">
//         <ul class="pagination justify-content-center">
//           <li class="page-item disabled">
//             <a class="page-link" href="#" tabindex="-1">
//               Previous
//             </a>
//           </li>
//           <li class="page-item">
//             <a class="page-link" href="#">
//               1
//             </a>
//           </li>
//           <li class="page-item">
//             <a class="page-link" href="#">
//               2
//             </a>
//           </li>
//           <li class="page-item">
//             <a class="page-link" href="#">
//               3
//             </a>
//           </li>
//           <li class="page-item">
//             <a class="page-link" href="#">
//               Next
//             </a>
//           </li>
//         </ul>
//       </nav>
//     </>
//   );
// }

import React, { useContext, useState } from "react";
import { Button, Card, Elevation } from "@blueprintjs/core";
import ReactPaginate from "react-paginate";
import { SettingsContext } from "./contex";
import './list.scss'
function List(props) {
  const settings = useContext(SettingsContext);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = settings.numOfItems;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = props.list
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => {
      return (
        <div key={item.id}className="div-flex1"
      >
          <Card interactive={true} elevation={Elevation.TWO} className="cardDiv">
            <p>{item.text}</p>
            <p>
              <small>Assigned to: {item.assignee}</small>
            </p>
            <p>
              <small>Difficulty: {item.difficulty}</small>
            </p>

            <Button onClick={() => props.toggleComplete(item.id)}>
              Complete: {item.complete.toString()}
            </Button>
          </Card>
        </div>
      );
    });
  const pageCount = Math.ceil(props.list.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <>
      {displayUsers}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </>
  );
}

export default List;
