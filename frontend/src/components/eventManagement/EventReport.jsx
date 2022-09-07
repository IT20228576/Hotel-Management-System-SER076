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
    const [searchTerm, setSearchTerm] = useState("");

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
    })

    return(
        <div style={{marginLeft: "100px"}}>
            <div style={{marginTop: "15px", marginBottom: "-56px", marginLeft: "70px"}}>
        <Button variant="primary" onClick={handlePrint}>Download</Button>
        </div>
            <br></br>
            <div style={{marginLeft:"200px"}}>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2"
      style={{width: "700px", marginLeft: "300px"}}
      placeholder="month of number" 
      type="search"
    name="searchQuery"
    onChange={(event) => {
        setSearchTerm(event.target.value);
    }}></input>
    </form>
  </div>
  <br></br>
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                geteventdata.filter((element)=> {
                                    if(searchTerm == ""){
                                        return element
                                    }else if (element.EventDate.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return element
                                    }
                                }).map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">E{id + 100 + 1}</th>
                                                <th scope="row">{element.EventName}</th>
                                                <th scope="row">{element.EventType}</th>
                                                <th scope="row">{element.EventDate}</th>
                                                <th scope="row">{element.ClientName}</th>
                                                <th scope="row">{element.EventStartTime} {element.EventEndTime}</th>
                                                <th scope="row">{element.NoOfParticipants}</th>
                                                <th scope="row">{element.EventStatus}</th>
                                                <th scope="row">{element.EventLocation}</th>
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
        </div>
    )
}

export default EventReport;