import React, { useState, useEffect, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { NavLink } from "react-router-dom";
import { deldata } from "./context/ContextProvider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { Button, Card } from "react-bootstrap";
import img4 from "../Images/image4.jpg";

const AvailableEventsForCustomer = () => {
  const [geteventdata, setEventdata] = useState([]);
  console.log(geteventdata);

  const { setDLTdata } = useContext(deldata);
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
      <div style={{ marginLeft: "100px", height:'500px' }}>
      <div className="mt-5">
        <div>
          <div>
            <nav
              className="navbar navbar-expand-lg navbar-light"
              style={{ marginLeft: "100px" }}
            >
              <h1
                className="navbar-brand"
                style={{ marginRight: "100px", marginLeft: "100px" }}
              >
                Events
              </h1>
            </nav>
          </div>
        </div>

        <div className="container">
              {geteventdata.map((element, id) => {
                  return (
                    <>
                    <Card style={{ width: "18rem", float: "left", marginLeft: "70px" }}>
            <Card.Body>
            <img
                className="d-block w-100 mx-auto px-1"
                src={img4}
                alt="First slide"
                style={{ width: "400px", height: "200px" }}
              />
            <p>Event ID E{id + 100 + 1}</p>
            <p>Event Name {element.EventName}</p>
            <p>Event Status {element.EventStatus}</p>
            <NavLink to={`/EventForCustomer/${element._id}`}><Button>Find</Button></NavLink>
            </Card.Body>
          </Card>
                    </>
                  );
                })}
        </div>
      </div>
      </div>
    </>
  );
};

export default AvailableEventsForCustomer;
