import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useParams, useNavigate } from 'react-router-dom';


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
            <h1 style={{ fontWeight: 400 }}>View Event</h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div>
                        <div>
                            
                            <p>EventName: <span >{geteventdata.EventName}</span></p>
                            <p>EventType: <span >{geteventdata.EventType}</span></p>
                            <p>EventDate: <span>{geteventdata.EventDate}</span></p>
                            <p>ClientName: <span>{geteventdata.ClientName}</span></p>
                            <p>EventStartDate: <span >{geteventdata.EventStartDate}</span></p>
                            <p>EventEndDate: <span >{geteventdata.EventEndDate}</span></p>
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
