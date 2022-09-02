import React, {useRef, useState, useEffect} from 'react'
import {useReactToPrint} from 'react-to-print';
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import img5 from '../eventManagement/Images/Logo.png';
import {Button} from "react-bootstrap";



const EventReport = () => {

    const componentRef = useRef();

    const [geteventdata, setEventdata] = useState([]);
    console.log(geteventdata);

    const getdata = async () => {

        const res = await fetch("http://localhost:8000/event/view", {
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

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'eventreport',
        // onAfterPrint: ()=> alert("Print Success")
    })
    return(
        <div style={{marginLeft: "100px"}}>
        <div ref={componentRef} style={{width: '100%', height:window.innerHeight}}>

        <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    <div style={{float:"left", width:"25%"}}>
                    <img
                src={img5}
                alt="First slide"
                style={{ width: "200px", height: "200px", marginTop: "10px" }}></img> 
                    </div>
                    
                    <div style={{float:"left", width:"50%"}}>
                    <h1 style={{marginTop: "10px", textAlign: "center"}}>CISP HOTEL</h1>
                    <h4>Events Report</h4> 
                    </div>

                    <div style={{float:"left", width:"25%"}}>
                    <img
                src={img5}
                alt="First slide"
                style={{ width: "200px", height: "200px", marginTop: "10px" }}></img> 
                    </div>
                  <br></br>
                  </Card.Title>
        
            <div className="container">

                    <table  class="table table-hover" style={{textAlign:"center"}}>
                        <thead>
                            <tr>
                                <th scope="col">Event ID</th>
                                <th scope="col">Event Name</th>
                                 <th scope="col">Event Type</th>
                                <th scope="col">Event Date</th>
                                <th scope="col">Client Name</th>
                                <th scope="col">Event Time</th>
                                <th scope="col">No Of Participants</th>
                                <th scope="col">Event Status</th>
                                <th scope="col">Event Location</th>
                                <th scope="col">Event Description</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                geteventdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td scope="row">{element.EventName}</td>
                                                <td scope="row">{element.EventType}</td>
                                                <td scope="row">{element.EventDate}</td>
                                                <td scope="row">{element.ClientName}</td>
                                                <td scope="row">{element.EventStartTime} {element.EventEndTime}</td>
                                                <td scope="row">{element.NoOfParticipants}</td>
                                                <td scope="row">{element.EventStatus}</td>
                                                <td scope="row">{element.EventLocation}</td>
                                                <td scope="row">{element.EventDescription}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>


                </div>
                </Card.Body>
              </Card>
            </CardGroup>
        </div>
        <div class="col-md-12 text-center" style={{marginTop: "-25px", marginBottom: "10px"}}>
        <Button variant="primary" onClick={handlePrint}>Download</Button>
        </div>
        </div>
    )
}

export default EventReport;