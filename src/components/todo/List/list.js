import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Elevation } from "@blueprintjs/core";
import ReactPaginate from "react-paginate";
import { SettingsContext } from "../contex/contex";
import "./list.scss";

function List(props) {
  const settings = useContext(SettingsContext);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  let usersPerPage = settings.numOfItems;

  console.log(settings.numOfItems, settings);

  const pagesVisited = pageNumber * usersPerPage;


  //function to display completedItems:
  function display(status) {
    let arrOfCompletedItem;
    if(status==true){
      arrOfCompletedItem=props.list.filter((item)=>item.complete)

    }
    else{
      return props.list
    }
    return arrOfCompletedItem;
  }

  console.log(display(settings.display) ) 
  const displayUsers = display(settings.display)
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

            <Button onClick={() => props.toggleComplete(item.id)}>
              Complete: {item.complete.toString()}
            </Button>
          </Card>
        </div>
      );
    });
  console.log(settings.numOfItems, "settings.numOfItems");
  useEffect(() => {
    let page = Math.ceil(props.list.length / settings.numOfItems);
    setPageCount(page);
    console.log(page,"page",settings.numOfItems,"settings.numOfItems");
  }, [props.list]);
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
