import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Elevation } from "@blueprintjs/core";
import ReactPaginate from "react-paginate";
import { SettingsContext } from "../../contex/contex";
import "./list.scss";
import Auth from "../../Auth/auth";

function List(props) {
  const settings = useContext(SettingsContext);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  let usersPerPage = settings.numOfItems;
  const pagesVisited = pageNumber * usersPerPage;

  useEffect(() => {
    let page = Math.ceil(props.list.length / settings.numOfItems);
    setPageCount(page);
  }, [props.list, settings.numOfItems]);

  //function to display completedItems:
  function display(status) {
    let arrOfCompletedItem;
    if (status == true) {
      arrOfCompletedItem = props.list.filter((item) => item.complete);
    } else {
      return props.list;
    }
    return arrOfCompletedItem;
  }

  const displayUsers = props.list
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => {
      return (
        <div key={item.id} className="div-flex1">
          <Card
            interactive={true}
            elevation={Elevation.TWO}
            className="cardDiv"
          >
            <p>{item.text}</p>
            <p>
              <small>Assigned to: {item.assignee}</small>
            </p>
            <p>
              <small>Difficulty: {item.difficulty}</small>
            </p>
            <Auth capability="update">
              <Button onClick={() => props.toggleComplete(item,item.id)}>
                Complete: {item.complete.toString()}
              </Button>
            </Auth>

            <Auth capability="delete">
              <Button onClick={() => props.deleteItem(item.id)}>Delete:</Button>
             </Auth>
          </Card>
        </div>
      );
    });

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
