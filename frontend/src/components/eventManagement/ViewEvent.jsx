import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { Modal, Button, Table } from "react-bootstrap";
import img7 from '../eventManagement/Images/image7.jpeg';
import "../layout/Styles/PopUpStyles.css";


const ViewEvent = () => {

    const [geteventdata, setEventdata] = useState([]);
    console.log(geteventdata);

    const { id } = useParams("");
    console.log(id);

    const history = useNavigate();

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
            setEventdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    return (
        <div className="container mt-3" style={{marginLeft:"100px"}}>
<Modal
        dialogClassName="my-modal"
        show={true}
        backdrop="static"
      >
        <a href='/view'><Modal.Header closeButton></Modal.Header></a>
          <Modal.Title style={{textAlign: "center"}}>{geteventdata.EventName}</Modal.Title>
          <br></br>
          <img style={{width:"400px", height: "300px", margin: "auto"}}src={img7}/>
        <Modal.Body>
          <Table bordered responsive>
            <tbody>
              <tr>
         <td style={{ backgroundColor: "#D3D3D3" }}>
           <b>Event ID</b>
         </td>
        <td>{id}</td>
       </tr>
       <tr>
         <td style={{ backgroundColor: "#D3D3D3" }}>
           <b>Event Type</b>
         </td>
        <td>{geteventdata.EventType}</td>
       </tr>
       <tr>
         <td style={{ backgroundColor: "#D3D3D3" }}>
           <b>Event Date</b>
         </td>
        <td>{geteventdata.EventDate}</td>
       </tr>
       <tr>
         <td style={{ backgroundColor: "#D3D3D3" }}>
           <b>Client Name</b>
         </td>
        <td>{geteventdata.ClientName}</td>
       </tr>
       <tr>
         <td style={{ backgroundColor: "#D3D3D3" }}>
           <b>Event Start Time</b>
         </td>
        <td>{geteventdata.EventStartTime}</td>
       </tr>
       <tr>
         <td style={{ backgroundColor: "#D3D3D3" }}>
           <b>Event End Time</b>
         </td>
        <td>{geteventdata.EventEndTime}</td>
       </tr>
       <tr>
         <td style={{ backgroundColor: "#D3D3D3" }}>
           <b>No Of Participants</b>
         </td>
        <td>{geteventdata.NoOfParticipants}</td>
       </tr>
       <tr>
         <td style={{ backgroundColor: "#D3D3D3" }}>
           <b>Event Status</b>
         </td>
        <td>{geteventdata.EventStatus}</td>
       </tr>
       <tr>
         <td style={{ backgroundColor: "#D3D3D3" }}>
           <b>Event Location</b>
         </td>
        <td>{geteventdata.EventLocation}</td>
       </tr>
       <tr>
         <td style={{ backgroundColor: "#D3D3D3" }}>
           <b>Event Description</b>
         </td>
        <td>{geteventdata.EventDescription}</td>
       </tr>
       <tr>
         <td style={{ backgroundColor: "#D3D3D3" }}>
           <b>Event Image</b>
         </td>
        <td>{geteventdata.EventImage}</td>
       </tr>
       </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <a href='/view'><Button variant="danger">
            Close
          </Button></a>
        </Modal.Footer>
      </Modal>

            <h1 style={{ fontWeight: 400 }}>View Event</h1>
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div>
                        <div>
                            <p>EventName: <span >{geteventdata.EventName}</span></p>
                            <p>EventType: <span >{geteventdata.EventType}</span></p>
                            <p>EventDate: <span>{geteventdata.EventDate}</span></p>
                            <p>ClientName: <span>{geteventdata.ClientName}</span></p>
                            <p>EventStartTime: <span >{geteventdata.EventStartTime}</span></p>
                            <p>EventEndTime: <span >{geteventdata.EventEndTime}</span></p>
                            <p>NoOfParticipants: <span>{geteventdata.NoOfParticipants}</span></p>
                            <p>EventStatus: <span>{geteventdata.EventStatus}</span></p>
                            <p>EventLocation: <span>{geteventdata.EventLocation}</span></p>
                            <p>EventDescription: <span >{geteventdata.EventDescription}</span></p>
                            <p>EventImage: <span>{geteventdata.EventImage}</span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
export default ViewEvent
