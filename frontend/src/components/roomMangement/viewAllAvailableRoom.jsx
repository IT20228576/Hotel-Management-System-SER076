import React, { useState, useEffect } from "react";

import {
  Card,
  Col,
  Row,
  Button,
  Accordion,
  Form,
  Container,
} from "react-bootstrap";

import { Link, Navigate, useNavigate } from "react-router-dom";

import axios from "axios";

function ViewAllAvailableRoom() {

  const [roomList, setRoomList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    function getRooms() {
      axios.get("http://localhost:8000/api/room/getAll").then((res) => {
        setRoomList(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getRooms();


  }, []);



  var viewItems_HTMLTABLE = "";

  if (roomList) {

    viewItems_HTMLTABLE =
      roomList.map((data) => {
        if (typeof (data.image) !== 'undefined') {
          return (

            <div className="card" width="200" height="200" key={data._id}>
              <center><h4 className="card-title">{data.roomName}</h4></center>
              <center><img width="200" height="200" src={require(`../image/${data.image}`)} /></center>
              <div className="card-body">
                <center><button onClick={() => navigate(`/roomDetailsView/${data._id}`, {
                  state: {
                    id: data._id
                  }
                })} className="btn btn-secondary">Find More Details</button>&nbsp;
                  <a href='' className="btn btn-secondary">Reserve</a></center>
              </div>
            </div>


          );
        }
      });

  }

  else
    viewItems_HTMLTABLE = "loading"


  return (
    <>

      <Container>
        <div><h2>Available Room</h2></div>

        <br /><br /><br />

        <div className="card-group m-2" >
          {viewItems_HTMLTABLE}
        </div>

      </Container>

    </>
  );
}

export default ViewAllAvailableRoom;
