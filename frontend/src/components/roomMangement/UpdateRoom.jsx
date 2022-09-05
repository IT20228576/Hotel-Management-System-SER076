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

function UpdateRoom(props) {

  const [roomToUpdate, setRoomToUpdate] = useState([]);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/room/getOne/" + localStorage.getItem("updateid"))
      .then((res) => setRoomToUpdate(res.data))
      //.then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

  const [room, setRoom] = useState({
    roomName: "",
    roomNumber: "",
    imageURL: "",
    roomPrice: "",
    roomType: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setRoom({ ...room, [name]: value });
  }


 
  async function handleEdit(e) {
    e.preventDefault();
   
    const data = new FormData();

    data.append("file", image);
    data.append("upload_preset", "roommangment");
    data.append("cloud_name", "dottqi9rk");
    // data.append("quality", "q_auto");

    
    fetch("https://api.cloudinary.com/v1_1/dottqi9rk/image/upload/", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTimeout(() => {
          //console.log(data.url);
          setUrl(data.url);
          console.log(data.url);
          setRoom((room.imageURL = data.url));
          console.log(room);
          
          axios
            .put(
              "http://localhost:8000/api/room/update/" +  localStorage.getItem("updateid"),
              room
            )
            .then(function (response) {
              console.log(response);
              window.location.reload();
            })
            .catch(function (error) {
              console.log(error.response);
            });
        }, 2000);
      })
      .catch((err) => console.log(err));
  }


  return (
    <div>
     
      <Container>
        <form className="formCard" border="dark" onSubmit={handleEdit}  style={{ margin: "2%"}}>
          <Row className="justify-content-md-center">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Room Name</Form.Label>
                <Form.Control
                  name="roomName"
                  placeholder="Room Name"
                  defaultValue={roomToUpdate.roomName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Room Number</Form.Label>
                <Form.Control
                  name="roomNumber"
                  placeholder="Room Number"
                  defaultValue={roomToUpdate.roomNumber}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="image"
                  placeholder="Image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Room Price</Form.Label>
                <Form.Control
                  name="roomPrice"
                  placeholder="Room Price"
                  defaultValue={roomToUpdate.roomPrice}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="secondary" size="lg" style={{ width: "70%", float: "right" }}>
                Reset
              </Button>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Room Type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  defaultValue={roomToUpdate.roomType}
                  onChange={handleChange}
                  name="roomType"
                >
                  <option>Room Type</option>
                  <option value="King room">King room</option>
                  <option value="Twin room">Twin room</option>
                  
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  placeholder="Description"
                  as="textarea"
                  rows={8}
                  onChange={handleChange}
                  defaultValue={roomToUpdate.description}
                />
              </Form.Group>
              <Button
                variant="primary"
                size="lg"
                type="submit"
                style={{ width: "70%", float:"left", margin:"5px"}}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    </div>
  );
}
export default UpdateRoom;
