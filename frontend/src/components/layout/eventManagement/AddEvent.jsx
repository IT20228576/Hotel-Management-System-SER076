import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { adddata } from './context/ContextProvider';
import {
    Card,
    Col,
    Row,
    Button,
    Accordion,
    Form,
    Container,
  } from "react-bootstrap";

const AddEvent = () => {

    const { udata, setUdata } = useContext(adddata);

    const navigate  = useNavigate();

    const [inpval, setINP] = useState({
        EventName: "",
        EventType: "",
        EventDate: "",
        ClientName: "",
        EventStartTime: "",
        EventEndTime: "",
        NoOfParticipants: "",
        EventStatus: "",
        EventLocation: "",
        EventDescription: "",
        EventImage: ""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const addinpdata = async (e) => {
        e.preventDefault();

        const { EventName, EventType, EventStartTime, EventEndTime, ClientName, NoOfParticipants, EventDate, EventStatus, EventLocation, EventDescription, EventImage } = inpval;

        const res = await fetch("http://localhost:8000/event/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                EventName, EventType, EventStartTime, EventEndTime, ClientName, NoOfParticipants, EventDate, EventStatus, EventLocation, EventDescription, EventImage
            })
        });

        const data = await res.json();
        console.log(data);
        // alert("Success");

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
          alert("Add Event Details Successfully")
            navigate("/view")
            setUdata(data)
            console.log("data added");

        }
    }

    return (
        <div style={{marginLeft:"100px", marginTop:"10px"}}>
        <Container>
        <h1 style={{margin:"2%" }}>Add Event</h1>
      <hr></hr>
            <form className="formCard" border="dark">
            <Row className="justify-content-md-center">
            <Col>
            <Form.Group className="mb-3">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  placeholder="Event Name"
                  value={inpval.EventName} onChange={setdata} name="EventName"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Date</Form.Label>
                <Form.Control
                  placeholder="Event Date"
                  value={inpval.EventDate} onChange={setdata} name="EventDate"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Start Date</Form.Label>
                <Form.Control
                  placeholder="Event Start Date"
                  value={inpval.EventStartTime} onChange={setdata} name="EventStartTime"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>No Of Participants</Form.Label>
                <Form.Control
                  placeholder="No Of Participants"
                  value={inpval.NoOfParticipants} onChange={setdata} name="NoOfParticipants"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Event Location</Form.Label>
                <Form.Control
                  placeholder="Event Location"
                  value={inpval.EventLocation} onChange={setdata} name="EventLocation"
                />
              </Form.Group>
              <Button variant="secondary" size="lg" style={{ width: "70%", float: "right" }}>
                Reset
              </Button>
              </Col>
              <Col>
            <Form.Group className="mb-3">
                <Form.Label>Event Type</Form.Label>
                <Form.Control
                  placeholder="Event Type"
                  value={inpval.EventType} onChange={setdata} name="EventType"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Client Name</Form.Label>
                <Form.Control
                  placeholder="Client Name"
                  value={inpval.ClientName} onChange={setdata} name="ClientName"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event End Date</Form.Label>
                <Form.Control
                  placeholder="Event End Date"
                  value={inpval.EventEndTime} onChange={setdata} name="EventEndTime"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Event Status</Form.Label>
                <Form.Control
                  placeholder="Event Status"
                  value={inpval.EventStatus} onChange={setdata} name="EventStatus"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Event Description</Form.Label>
                <Form.Control
                  placeholder="Event Description"
                  value={inpval.EventDescription} onChange={setdata} name="EventDescription"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Event Image</Form.Label>
                <Form.Control
                  placeholder="Event Image"
                  value={inpval.EventImage} onChange={setdata} name="EventImage"
                />
              </Form.Group>
              <Button
                variant="primary"
                size="lg"
                type="submit"
                style={{ width: "70%", float:"left", margin:"5px"}}
                onClick={addinpdata}
              >
                Submit
              </Button>
            </Col>
          </Row>
            </form>
            </Container>
        </div>
    )
}
export default AddEvent;
