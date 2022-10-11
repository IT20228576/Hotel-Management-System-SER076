import React, { useState, useEffect, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { NavLink } from "react-router-dom";
import { deldata } from "./context/ContextProvider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SummarizeIcon from "@mui/icons-material/Summarize";
// import PaginationComponent from "./layout/PaginationComponent";
// import { useNavigate } from "react-router-dom";

const ViewListEvents = () => {
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

  const deleteevent = async (id) => {
    const res2 = await fetch(`http://localhost:8000/event/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      alert("Deleted Event Details Successfully");
      console.log("event deleted");
      setDLTdata(deletedata);
      getdata();
    }
  };

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
                style={{ marginRight: "100px", marginLeft: "100px", fontSize:"40px"  }}
              >
                Events
              </h1>
              <a href="/event/new" style={{ marginRight: "10px" }}>
                <button
                  className="btn btn-outline-success my-1 my-sm-0"
                  style={{ width: "100px" }}
                  type="submit"
                >
                  <AddCircleIcon /> Add
                </button>
              </a>
              <a href="/eventreport" style={{ marginRight: "10px" }}>
                <button
                  className="btn btn-outline-primary my-2 my-sm-0"
                  style={{ width: "130px" }}
                  type="submit"
                >
                  <SummarizeIcon /> Report
                </button>
              </a>

              <div style={{}}>
                <form className="form-inline my-2 my-lg-0">
                  <input
                    className="form-control mr-sm-2"
                    style={{
                      width: "430px",
                      marginLeft: "100px",
                      marginRight: "10px",
                    }}
                    placeholder="Search By Event Name / Event Type / Event Date / Event Status"
                    type="search"
                    name="searchQuery"
                    onChange={(event) => {
                      setSearchTerm(event.target.value);
                    }}
                  ></input>
                </form>
              </div>
            </nav>
          </div>
        </div>

        <div className="container">
          <table className="table table-hover" style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th scope="col">
                  <b>Event ID</b>
                </th>
                <th scope="col">Event Name</th>
                <th scope="col">Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {geteventdata
                .filter((element) => {
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
                  }
                  return false;
                }).map((element, id) => {
                  return (
                    <>
                      <tr>
                        <td>E{id + 100 + 1}</td>
                        <td>{element.EventName}</td>
                        <td>
                          <NavLink to={`/view/${element._id}`}>
                            {" "}
                            <i className="btn btn-outline-secondary">
                              <RemoveRedEyeIcon />
                            </i>
                          </NavLink>
                          &nbsp; &nbsp;
                          <NavLink to={`/edit/${element._id}`}>
                            <i className="btn btn-outline-warning">
                              <EditIcon />
                            </i>
                          </NavLink>
                          &nbsp; &nbsp;
                          <i
                            className="btn btn-outline-danger"
                            onClick={() => deleteevent(element._id)}
                          >
                            <DeleteIcon />
                          </i>
                          &nbsp;
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </>
  );
};

export default ViewListEvents;
