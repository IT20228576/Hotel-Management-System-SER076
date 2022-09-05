import React, { useState } from "react";
import { Col, Row, Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TimePicker from "react-time-picker";

function AddReservation() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [roomType, setRoomType] = useState("");
  const [room, setRoom] = useState("");
  const [checkinDate, setCheckinDate] = useState("");
  const [checkinTime, setCheckinTime] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [checkoutTime, setCheckoutTime] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const resObj = {
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      email: email,
      roomType: roomType,
      room: room,
      checkinDate: checkinDate,
      checkinTime: checkinTime,
      checkoutDate: checkoutDate,
      checkoutTime: checkoutTime,
      adults: adults,
      children: children,
      numberOfRooms: numberOfRooms,
      amount: amount,
      paymentMethod: paymentMethod,
      note: note,
    };

    axios
      .post("http://localhost:8000/reservations/add", resObj)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          navigate("/reservations");
        } else if (response.status === 500) {
          alert("Reservation Validation Failed");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <div className="container">
      <h1 style={{ margin: "2%" }}>Add Reservation</h1>
      <hr />
      <Container>
        <form onSubmit={handleSubmit} border="dark">
          <Row className="justify-content-md-center">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>First Name *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number *</Form.Label>
                <Form.Control
                  required
                  name="phoneNumber"
                  placeholder="Phone Number"
                  maxLength="10"
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Room Type *</Form.Label>
                <Form.Select
                  required
                  aria-label="Default select example"
                  onChange={(e) => setRoomType(e.target.value)}
                >
                  <option value="King room">King room</option>
                  <option value="Twin room">Twin room</option>
                </Form.Select>
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Check-in Date and Time *</Form.Label>
                    <Form.Control
                      required
                      type="date"
                      placeholder="Check-in Date"
                      onChange={(e) => setCheckinDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col className="row justify-content-center align-items-center mt-3">
                  <TimePicker
                    required
                    onChange={(value) => setCheckinTime(value)}
                  />
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Adults *</Form.Label>
                <Form.Control
                  required
                  name="adults"
                  placeholder="Adults"
                  type="number"
                  onChange={(e) => setAdults(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Children</Form.Label>
                <Form.Control
                  name="children"
                  placeholder="Children"
                  type="number"
                  onChange={(e) => setChildren(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Amount *</Form.Label>
                <Form.Control
                  required
                  name="amount"
                  placeholder="Amount"
                  onChange={(e) => setAmount(e.target.value)}
                  readOnly
                  disabled
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Last Name *</Form.Label>
                <Form.Control
                  required
                  name="lastName"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  required
                  name="email"
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Room Name *</Form.Label>
                <Form.Select
                  required
                  aria-label="Default select example"
                  onChange={(e) => setRoom(e.target.value)}
                >
                  <option value="R001">R001</option>
                  <option value="R002">R002</option>
                </Form.Select>
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Check-out Date and Time *</Form.Label>
                    <Form.Control
                      required
                      type="date"
                      placeholder="Check-out Date"
                      onChange={(e) => setCheckoutDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col className="row justify-content-center align-items-center mt-3">
                  <TimePicker
                    required
                    closeClock={true}
                    onChange={(value) => setCheckoutTime(value)}
                  />
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Rooms *</Form.Label>
                <Form.Control
                  required
                  name="rooms"
                  placeholder="Rooms"
                  type="number"
                  onChange={(e) => setNumberOfRooms(e.target.value)}
                />
              </Form.Group>

              <Row>
                <Form.Label>Payment Method</Form.Label>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Cash"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios1"
                      value="Cash"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="radio"
                      label="Card"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios2"
                      value="Card"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  name="note"
                  placeholder="Description"
                  as="textarea"
                  rows={5}
                  onChange={(e) => setNote(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                variant="secondary"
                size="lg"
                type="reset"
                style={{ width: "70%", float: "right", margin: "5px" }}
              >
                Reset
              </Button>
            </Col>
            <Col>
              <Button
                variant="primary"
                size="lg"
                type="submit"
                style={{ width: "70%", float: "left", margin: "5px" }}
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

export default AddReservation;
