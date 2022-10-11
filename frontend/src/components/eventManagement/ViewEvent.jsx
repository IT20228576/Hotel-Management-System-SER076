import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Modal, Button, Table } from "react-bootstrap";
import img7 from '../eventManagement/Images/image7.jpeg';
import "../layout/Styles/PopUpStyles.css";
import PaginationComponent from "./layout/PaginationComponent";
import { useNavigate } from "react-router-dom";


const ViewEvent = () => {

    const [geteventdata, setEventdata] = useState([]);
    console.log(geteventdata);

    const [pageNo, setPageNo] = useState(1);

  const [pageCount, setPageCount] = useState(0);

  const [totalCount, setTotalCount] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [rooms, setRooms] = useState([]); 
  let navigate = useNavigate();

    const { id } = useParams("");
    console.log(id);

    // const history = useNavigate();

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
          <img style={{width:"400px", height: "300px", margin: "auto"}} src={img7} alt=''/>
        <Modal.Body>
          <Table bordered responsive>
            <tbody>
              <tr>
         <td style={{ backgroundColor: "#D3D3D3" }}>
           <b>Event ID</b>
         </td>
        <td>E10{id.lastIndexOf()+4}</td>
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
           <b>Client/ Company/ Organization Name</b>
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
       </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <a href='/view'><Button variant="danger">
            Close
          </Button></a>
        </Modal.Footer>
      </Modal>
        </div>
    )
}
export default ViewEvent
