/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PrintIcon from "@mui/icons-material/Print";
import { useReactToPrint } from "react-to-print";

function ConfirmReserve() {
  const { state } = useLocation();
  const [firstName, setFirstName] = useState(state.firstName);
  const [lastName, setLastName] = useState(state.lastName);
  const [mobile, setMobile] = useState(state.mobile);
  const [email, setEmail] = useState(state.email);
  const [room, setRoom] = useState(state.room);
  const [checkinDate, setCheckinDate] = useState(state.checkinDate);
  const [checkinTime, setCheckinTime] = useState(
    moment(state.checkinTime, "hh:mm a").format("hh:mm a")
  );
  const [checkoutDate, setCheckoutDate] = useState(state.checkoutDate);
  const [checkoutTime, setCheckoutTime] = useState(
    moment(state.checkoutTime, "hh:mm a").format("hh:mm a")
  );
  const [numberOfRooms, setNumberOfRooms] = useState(state.numberOfRooms);
  const [amount, setAmount] = useState(state.amount);
  const [tax, setTax] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const componentRef = useRef();
  const navigate = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Reservation-Confirmation-Report",
  });

  return (
    <div className="container" ref={componentRef}>
      <Container className="d-flex justify-content-center mt-5">
        <Card style={{ width: "100rem" }}>
          <Card.Header className="d-flex justify-content-between">
            <h2>Confirm Reservation</h2>
            <Button variant="secondary" onClick={handlePrint}>
              <PrintIcon />
            </Button>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Row>
                  <Card.Subtitle as="h5" className="mt-2">
                    Personal Info
                  </Card.Subtitle>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      Full Name: {firstName} {lastName}
                    </ListGroup.Item>
                    <ListGroup.Item>Phone Number: {mobile}</ListGroup.Item>
                    <ListGroup.Item>
                      Email: <Link to="/#">{email}</Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Row>
                <Row>
                  <Card.Subtitle as="h5" className="mt-3">
                    Dates
                  </Card.Subtitle>
                  <ListGroup className="list-group-flush border">
                    <ListGroup.Item style={{ fontSize: "18px" }}>
                      Check-in: {checkinDate} {checkinTime}
                      <KeyboardArrowRightIcon />
                      Check-out: {checkoutDate} {checkoutTime}
                    </ListGroup.Item>
                  </ListGroup>
                </Row>
              </Col>
              <Col>
                <Card.Subtitle as="h5" className="mt-2">
                  Summary
                </Card.Subtitle>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <th>Price</th>
                      <td>{amount}</td>
                    </tr>
                    <tr>
                      <th>Room</th>
                      <td>{room}</td>
                    </tr>
                    <tr>
                      <th>Number of Rooms</th>
                      <td>{numberOfRooms}</td>
                    </tr>
                    <tr>
                      <th>Tax (0.0%)</th>
                      <td>{tax}</td>
                    </tr>
                    <tr>
                      <th>Total Price</th>
                      <td>{totalAmount}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>

            <Row className="text-center mt-5">
              <Col>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate("/reserve")}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button variant="primary" size="lg">
                  Confirm
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ConfirmReserve;
