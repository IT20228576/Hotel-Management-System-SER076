import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams,useNavigate } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'
import { Card, Col, Row, Button, Accordion, Form, Container } from "react-bootstrap";


const UpdateEvent = () => {

    // const [geteventdata, setEventdata] = useState([]);
    // console.log(geteventdata);

   const {updata, setUPdata} = useContext(updatedata)

    const navigate = useNavigate("");

    const [inpval, setINP] = useState({
        EventName: "",
        EventType: "",
        EventDate: "",
        ClientName: "",
        EventStartDate: "",
        EventEndDate: "",
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


    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`http://localhost:8000/event/vew/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setINP(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateevent = async(e)=>{
        e.preventDefault();

        const {EventName,EventType,EventStartDate,EventEndDate,ClientName,NoOfParticipants,EventDate,EventStatus, EventLocation, EventDescription, EventImage} = inpval;

        const res2 = await fetch(`http://localhost:8000/event/update/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                EventName,EventType,EventStartDate,EventEndDate,ClientName,NoOfParticipants,EventDate,EventStatus, EventLocation, EventDescription, EventImage
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
          alert("Update Event Details Successfully")
            navigate("/view")
            setUPdata(data2);
        }

    }

    return (
        <div style={{marginLeft:"100px", marginTop:"10px"}}>
            <Container>
            <h1>Update Event</h1>
      <hr></hr>
            <form className="formCard" border="dark">
            <Row className="justify-content-md-center">
            <Col>
            <Form.Group className="mb-3">
                <Form.Label>Event Name</Form.Label>
                <Form.Control value={inpval.EventName} onChange={setdata} name="EventName" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Event Date</Form.Label>
                <Form.Control value={inpval.EventDate} onChange={setdata} name="EventDate" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Event Start Date</Form.Label>
                <Form.Control value={inpval.EventStartDate} onChange={setdata} name="EventStartDate" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>No Of Participants</Form.Label>
                <Form.Control value={inpval.NoOfParticipants} onChange={setdata} name="NoOfParticipants" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Event Location</Form.Label>
                <Form.Control value={inpval.EventLocation} onChange={setdata} name="EventLocation" />
              </Form.Group>
              <Button variant="secondary" size="lg"  style={{width:"100%"}}>
                Reset
              </Button>
              </Col>
              <Col>
              <Form.Group className="mb-3">
                <Form.Label>Event Type</Form.Label>
                <Form.Control value={inpval.EventType} onChange={setdata} name="EventType" />
              </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>Client Name</Form.Label>
                <Form.Control value={inpval.ClientName} onChange={setdata} name="ClientName" />
              </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>Event End Date</Form.Label>
                <Form.Control value={inpval.EventEndDate} onChange={setdata} name="EventEndDate" />
              </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>Event Status</Form.Label>
                <Form.Control value={inpval.EventStatus} onChange={setdata} name="EventStatus" />
              </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>Event Description</Form.Label>
                <Form.Control value={inpval.EventDescription} onChange={setdata} name="EventDescription" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Event Image</Form.Label>
                <Form.Control value={inpval.EventImage} onChange={setdata} name="EventImage" />
              </Form.Group>
              <Button variant="secondary" size="lg" type="submit" style={{width:"100%"}} onClick={updateevent}>
                Submit
              </Button>
              </Col>
          </Row>
            </form>
            </Container>
        </div>
    )
}

export default UpdateEvent;





