import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PopUpViewTemplate from "./PopUpViewTemplate";

function ViewListTemplate() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="container">
      <div>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light">
            <h1
              className="navbar-brand"
              style={{ marginRight: "100px", marginLeft: "100px" }}
            >
              Events
            </h1>
            <a href="/#" style={{ marginRight: "10px" }}>
              <button
                className="btn btn-outline-success my-1 my-sm-0"
                type="submit"
              >
                <AddCircleIcon /> Add
              </button>
            </a>
            <a href="/#" style={{ marginRight: "10px" }}>
              <button
                className="btn btn-outline-primary my-2 my-sm-0"
                type="submit"
              >
                <SummarizeIcon /> Report
              </button>
            </a>

            <div style={{ marginLeft: "500px" }}>
              <form className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  placeholder="Search"
                  type="search"
                  name="searchQuery"
                ></input>
              </form>
            </div>
          </nav>
        </div>
      </div>
      <table className="table table-hover" style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th scope="col">
              <b>Event ID</b>
            </th>
            <th scope="col">
              <b>Event Name</b>
            </th>
            <th scope="col">
              <b>Actions</b>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>
              <a href={`/#`}>Meeing</a>
            </td>
            <td>
              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <RemoveRedEyeIcon />
              </button>
              &nbsp;
              <a href={`/#`} style={{ textDecoration: "none" }}>
                <i className="btn btn-outline-warning">
                  <EditIcon />
                </i>
                &nbsp;
              </a>
              &nbsp;
              <a href="/#" style={{ textDecoration: "none" }}>
                <i className="btn btn-outline-danger">
                  <DeleteIcon />
                </i>
                &nbsp;
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      {modalOpen === true ? (
        <PopUpViewTemplate handleModalClose={handleModalClose} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default ViewListTemplate;
