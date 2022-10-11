import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom';
import img7 from '../eventManagement/Images/eventimage4.jpg';
import "../layout/Styles/PopUpStyles.css";
import { Button } from "react-bootstrap";


const EventForCustomer = () => {

    const [geteventdata, setEventdata] = useState([]);
    console.log(geteventdata);

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
            setEventdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    })

    return (
        <div className="container mt-3" style={{marginLeft:"100px", height: "650px"}}>
          <h1 style={{textAlign: "center"}}><b>{geteventdata.EventName}</b></h1><br></br>
<div style={{float: "left", width: "200px", marginLeft: "100px"}}>
<p><b>EventID</b></p>
<p><b>EventType</b></p>
<p><b>EventDate</b></p>
<p><b>ClientName</b></p>
<p><b>EventStartTime</b></p>
<p><b>EventEndTime</b></p>
<p><b>NoOfParticipants</b></p>
<p><b>EventStatus</b></p>
<p><b>EventLocation</b></p>
<p><b>EventDescription</b></p>
</div>

<div style={{float: "left", width: "400px"}}>
<p>{geteventdata.EventName}</p>
<p>{geteventdata.EventType}</p>
<p>{geteventdata.EventDate}</p>    
<p>{geteventdata.ClientName}</p>
<p>{geteventdata.EventStartTime}</p>
<p>{geteventdata.EventEndTime}</p>
<p>{geteventdata.NoOfParticipants}</p>
<p>{geteventdata.EventStatus}</p>
<p>{geteventdata.EventLocation}</p> 
<p>{geteventdata.EventDescription}</p>
<NavLink to={`/AvailableEventsForCustomer`}><Button variant="secondary" style={{marginLeft:"100px", width:"340px", marginTop:"43px"}}>Back</Button></NavLink>
</div>

<div style={{float: "left", width: "100px"}}>
<img style={{width:"400px", height: "300px", margin: "auto"}} src={img7} alt=''/>
</div> 
        </div>
    )
}
export default EventForCustomer
