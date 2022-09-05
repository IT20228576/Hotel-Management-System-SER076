import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Button,
  Accordion,
  Form,
  Container,
  Table,
} from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UpdateRoom from "./UpdateRoom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import DeleteIcon from "@mui/icons-material/Delete";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PopUpViewTemplate from "./PopUpView";

//import Room from "./Room";

function ViewRooms() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const [rooms, setRooms] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/room/get")
      .then((res) => setRooms(res.data))
      //.then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

  async function update(id) {
    localStorage.setItem("updateid", id);
    navigate("/updateRoom");
  }

  return (
    <div>
      <div className="container">
        <div>
          <div>
            <nav class="navbar navbar-expand-lg navbar-light">
              <h1
                class="navbar-brand"
                style={{ marginRight: "100px", marginLeft: "100px" }}
              >
                Rooms
              </h1>
              <a href="/#" style={{ marginRight: "10px" }}>
                <button
                  class="btn btn-outline-success my-1 my-sm-0"
                  type="submit"
                >
                  <AddCircleIcon /> Add
                </button>
              </a>
              <a href="/#" style={{ marginRight: "10px" }}>
                <button
                  class="btn btn-outline-primary my-2 my-sm-0"
                  type="submit"
                >
                  <SummarizeIcon /> Report
                </button>
              </a>

              <div style={{ marginLeft: "500px" }}>
                <form class="form-inline my-2 my-lg-0">
                  <input
                    class="form-control mr-sm-2"
                    placeholder="Search"
                    type="search"
                    name="searchQuery"
                  ></input>
                </form>
              </div>
            </nav>
          </div>
        </div>
        <table class="table table-hover" style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th scope="col">
                <b>Room ID</b>
              </th>
              <th scope="col">
                <b>Room Name</b>
              </th>
              <th scope="col">
                <b>Room Type</b>
              </th>
              <th scope="col">
                <b>Room Price</b>
              </th>
              <th scope="col">
                <b>Room Number</b>
              </th>
              <th scope="col">
                <b>Actions</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => {
              return (
                <tr>
                  <td>{room._id}</td>
                  <td>{room.roomName}</td>
                  <td>{room.roomType}</td>
                  <td>{room.roomPrice}</td>
                  <td>{room.roomNumber}</td>
                  <td>
                  <button
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setModalOpen(true);
                      }}
                    >
                      <RemoveRedEyeIcon fontSize="large" />
                    </button>
                    <i class="btn btn-outline-warning">
                      <EditIcon
                        fontSize="large"
                        onClick={() => {
                          update(room._id);
                        }}
                      />
                    </i>
                    <i class="btn btn-outline-danger">
                      <DeleteOutlineIcon fontSize="large" />
                    </i>
                   
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {modalOpen === true ? (
        <PopUpViewTemplate handleModalClose={handleModalClose} />
      ) : (
        <></>
      )}
      </div>
      {/* <h1 style={{ marginLeft: "8%", padding: "2%" }}>Rooms</h1>
      <Row style={{ marginLeft: "10%" }}>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Room ID</th>
                <th>Room Name</th>
                <th>Room Type</th>
                <th>Room Price</th>
                <th>Room Number</th>
                <th>Actions</th>
              </tr>
            </thead>
           

            <tbody>
              {rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.roomName}</td>
                    <td>{room.roomType}</td>
                    <td>{room.roomPrice}</td>
                    <td>{room.roomNumber}</td>
                    <td>
                    <i class="btn btn-outline-warning">
                      <EditIcon
                        fontSize="large"
                        onClick={() => { update(room._id) }}
                       
                      />
                      </i>
                      <DeleteOutlineIcon fontSize="large" />
                    </td>
                    
                    
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row> */}
    </div>
  );
}
export default ViewRooms;