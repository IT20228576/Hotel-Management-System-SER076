import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Modal, Button, Table } from "react-bootstrap";
import img7 from '../eventManagement/Images/image7.jpeg';
import "../layout/Styles/PopUpStyles.css";


const EventForCustomer = () => {

    const [geteventdata, setEventdata] = useState([]);
    console.log(geteventdata);

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
    })

    return (
        <div className="container mt-3" style={{marginLeft:"100px"}}>
          <h1 style={{textAlign: "center"}}>{geteventdata.EventName}</h1><br></br>
<div style={{float: "left", width: "200px", marginLeft: "100px"}}>
<p>EventID</p>
<p>EventType</p>
<p>EventDate</p>
<p>ClientName</p>
<p>EventStartTime</p>
<p>EventEndTime</p>
<p>NoOfParticipants</p>
<p>EventStatus</p>
<p>EventLocation</p>
<p>EventDescription</p>
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
</div>

<div style={{float: "left", width: "100px"}}>
<img style={{width:"400px", height: "300px", margin: "auto"}} src={img7} alt=''/>
</div> 
        </div>
    )
}
export default EventForCustomer
