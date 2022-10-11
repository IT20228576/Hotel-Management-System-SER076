import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import img4 from "../eventManagement/Images/eventimage4.jpg";

const AvailableEventsForCustomer = () => {
  const [geteventdata, setEventdata] = useState([]);
  console.log(geteventdata);

  const [searchTerm, setSearchTerm] = useState("");

  const getdata = async () => {
    const res = await fetch("http://localhost:8000/event/view", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setEventdata(data);
      console.log("get data");
      }
  };

  useEffect(() => {
    getdata();
  }, []);


  return (
    <>
      <div style={{ marginLeft: "100px", height:"1000px" }}>
      <div className="mt-5">
      <div>
      <h1
                className="navbar-brand"
                style={{ marginRight: "100px", marginLeft: "100px", fontSize:"40px" }}
              >
                Available Events
              </h1>
      <div style={{marginLeft: "500px"}}>
                <form className="form-inline my-2 my-lg-0">
                  <input
                    className="form-control mr-sm-2"
                    style={{
                      width: "430px",
                      marginLeft: "100px",
                      marginRight: "10px",
                    }}
                    placeholder="Search By Event Name / Event Type / Event Date"
                    type="search"
                    name="searchQuery"
                    onChange={(event) => {
                      setSearchTerm(event.target.value);
                    }}
                  ></input>
                </form>
                </div>
              </div>
        <div>
          <div>
            <nav
              className="navbar navbar-expand-lg navbar-light"
              style={{ marginLeft: "100px" }}
            >
            </nav>
          </div>
        </div>

        <div className="container">
              {geteventdata.filter((element) => {
                  if (searchTerm === "") {
                    return element;
                  } else if (
                    element.EventName.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    ) ||
                    element.EventType.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    ) ||
                    element.EventDate.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    ) ||
                    element.EventStatus.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    )
                  ) {
                    return element;
                  }else{
                  
                  return false;
                  }
                }).map((element, id) => {
                  return (
                    <>
                    <Card style={{ width: "18rem", float: "left", marginLeft: "70px", marginBottom:"34px" }}>
            <Card.Body>
            <b>E{id + 100 + 1}</b>
            <p style={{textAlign:"center"}}><b>{element.EventName}</b>
            <img
                className="d-block w-100 mx-auto px-1"
                src={img4}
                alt="First slide"
                style={{ width: "400px", height: "200px" }}
              />
              </p>
            <p style={{textAlign:"left"}}>{element.EventDescription}</p>
            <NavLink to={`/EventForCustomer/${element._id}`}><Button style={{marginLeft:"100px"}}>Find More Details</Button></NavLink>
            </Card.Body>
          </Card>
                    </>
                  );
                })}
        </div>
      </div>
      </div>
      <div style={{textAlign:"center"}}>
        <i><b>Please contact us (0112812567) if you want reservation your event</b></i>
      </div>
    </>
  );
};

export default AvailableEventsForCustomer;
