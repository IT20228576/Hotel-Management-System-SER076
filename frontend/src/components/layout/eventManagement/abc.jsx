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

const Abc = () => {

    const { udata, setUdata } = useContext(adddata);

    const navigate  = useNavigate();

    const [inpval, setINP] = useState({
        EventName: "",
        EventType: "",
        EventDate: "",
        ClientName: "",
        EventStartDate: "",
        EventEndDate: "",
        NoOfParticipants: ""
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

        const { EventName, EventType, EventStartDate, EventEndDate, ClientName, NoOfParticipants, EventDate } = inpval;

        const res = await fetch("http://localhost:8000/event/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                EventName, EventType, EventStartDate, EventEndDate, ClientName, NoOfParticipants, EventDate
            })
        });

        const data = await res.json();
        console.log(data);
        // alert("Success");

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            navigate("/view")
            setUdata(data)
            console.log("data added");

        }
    }

    return (
        <div style={{marginLeft:"100px", marginTop:"100px"}}>
        <Container>
        <h1 style={{margin:"2%" }}>Add Room</h1>
      <hr></hr>
            <form className="formCard" border="dark">
            <Row className="justify-content-md-center">
            <Col>
            <Form.Group className="mb-3">
                <Form.Label>Room Name</Form.Label>
                <Form.Control
                  placeholder="Room Name"
                  value={inpval.EventName} onChange={setdata} name="EventName"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Room Name</Form.Label>
                <Form.Control
                  placeholder="Room Name"
                  value={inpval.EventType} onChange={setdata} name="EventType"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Room Name</Form.Label>
                <Form.Control
                  placeholder="Room Name"
                  value={inpval.EventDate} onChange={setdata} name="EventDate"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Room Name</Form.Label>
                <Form.Control
                  placeholder="Room Name"
                  value={inpval.ClientName} onChange={setdata} name="ClientName"
                />
              </Form.Group>
              <Button variant="secondary" size="lg" style={{ width: "70%", float: "right" }}>
                Reset
              </Button>
              </Col>
              <Col>
            <Form.Group className="mb-3">
                <Form.Label>Room Name</Form.Label>
                <Form.Control
                  placeholder="Room Name"
                  value={inpval.EventStartDate} onChange={setdata} name="EventStartDate"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Room Name</Form.Label>
                <Form.Control
                  placeholder="Room Name"
                  value={inpval.EventEndDate} onChange={setdata} name="EventEndDate"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Room Name</Form.Label>
                <Form.Control
                  placeholder="Room Name"
                  value={inpval.NoOfParticipants} onChange={setdata} name="NoOfParticipants"
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
                <div className="row">
                    {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label class="form-label">Event Name</label>
                        <input type="text" value={inpval.EventName} onChange={setdata} name="EventName" class="form-control" aria-describedby="emailHelp" />
                    </div> */}
                    {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label class="form-label">Event Type</label>
                        <input type="text" value={inpval.EventType} onChange={setdata} name="EventType" class="form-control" />
                    </div> */}
                    {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label class="form-label">Event Date</label>
                        <input type="text" value={inpval.EventDate} onChange={setdata} name="EventDate" class="form-control" />
                    </div> */}
                    {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label class="form-label">Client Name</label>
                        <input type="text" value={inpval.ClientName} onChange={setdata} name="ClientName" class="form-control" />
                    </div> */}
                    {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label class="form-label">Event Start Date</label>
                        <input type="text" value={inpval.EventStartDate} onChange={setdata} name="EventStartDate" class="form-control" />
                    </div> */}
                    {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label class="form-label">Event End Date</label>
                        <input type="text" value={inpval.EventEndDate} onChange={setdata} name="EventEndDate" class="form-control" />
                    </div> */}
                    {/* <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label class="form-label">No Of Participants</label>
                        <textarea type="text" value={inpval.NoOfParticipants} onChange={setdata} name="NoOfParticipants" className="form-control" cols="30" rows="5"></textarea>
                    </div> */}

                    {/* <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button> */}
                </div>
            </form>
            </Container>
        </div>
    )
}
export default Abc;
