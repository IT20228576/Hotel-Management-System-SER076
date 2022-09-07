import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { adddata } from './context/ContextProvider';
import {
    Col,
    Row,
    Button,
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
                [name]: value,
            }
        })
    }

    const handlePhoto = (e) => {

      console.log(e.target.files[0].filename);
        setINP((preval) => {
            return {
                ...preval,
                EventImage: e.target.files[0],
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
                <Form.Label>Event Name *</Form.Label>
                <Form.Control
                  placeholder="Event Name"
                  value={inpval.EventName} onChange={setdata} name="EventName"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Date *</Form.Label>
                <Form.Control
                  placeholder="Event Date"
                  type='date'
                  value={inpval.EventDate} onChange={setdata} name="EventDate"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Start Time *</Form.Label>
                <Form.Control
                type='time'
                  placeholder="Event Start Date"
                  value={inpval.EventStartTime} onChange={setdata} name="EventStartTime"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>No Of Participants *</Form.Label>
                <Form.Control
                  placeholder="No Of Participants"
                  value={inpval.NoOfParticipants} onChange={setdata} name="NoOfParticipants"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Location *</Form.Label>
                <Form.Select aria-label="Default select example" value={inpval.EventLocation} onChange={setdata} name="EventLocation">
                <option>Event Location</option>
      <option>Hall 01</option>
      <option>Hall 02</option>
      <option>Meeting Room 01</option>
      <option>Meetng Room 02</option>
      <option>Outdoor</option>
    </Form.Select>
              </Form.Group>

              <a href="/event/new"><Button variant="secondary" size="lg" style={{ width: "70%", float: "right", margin:"5px" }}>
                Reset
              </Button></a>
              </Col>

              <Col>
            <Form.Group className="mb-3">
                <Form.Label>Event Type *</Form.Label>
                <Form.Select aria-label="Default select example" value={inpval.EventType} onChange={setdata} name="EventType">
                <option>Event Type</option>
      <option>Wedding</option>
      <option>Meeting</option>
      <option>Award Ceremony</option>
      <option>Birthday Party</option>
      <option>Batch Party</option>
    </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Client Name *</Form.Label>
                <Form.Control
                  placeholder="Client Name"
                  value={inpval.ClientName} onChange={setdata} name="ClientName"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event End Time *</Form.Label>
                <Form.Control
                  placeholder="Event End Date"
                  type='time'
                  value={inpval.EventEndTime} onChange={setdata} name="EventEndTime"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Status *</Form.Label>
                <Form.Select aria-label="Default select example" value={inpval.EventStatus} onChange={setdata} name="EventStatus">
                <option>Event Status</option>
      <option>Available</option>
      <option>Not Available</option>
      <option>Postponed</option>
      <option>Cancelled</option>
    </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Description</Form.Label>
                <Form.Control
                  placeholder="Event Description"
                  value={inpval.EventDescription} onChange={setdata} name="EventDescription"
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
            
            <Col>
            <Form.Group className="mb-3" style={{marginTop: "140px"}}>
                <Form.Label>Event Image</Form.Label>
                <Form.Control
                  placeholder="Event Image"
                  type= 'file'
                  onChange={handlePhoto} name="EventImage"
                />
              </Form.Group>
            </Col>
          </Row>
            </form>
            </Container>
        </div>
    )
}
export default AddEvent;
