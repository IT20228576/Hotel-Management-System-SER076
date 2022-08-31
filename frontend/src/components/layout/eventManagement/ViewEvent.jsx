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

    const deleteevent = async (id) => {

        const res2 = await fetch(`http://localhost:8000/event/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("event deleted");
            history.push("/");
        }

    }

    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>View Event</h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div>
                        <div>
                            
                            <p>Event Name: <span >{geteventdata.EventName}</span></p>
                            <p>Event Date: <span >{geteventdata.EventDate}</span></p>
                            <p>Event Type: <span>{geteventdata.EventType}</span></p>
                            <p>Event Start Date: <span>{geteventdata.EventStartDate}</span></p>
                        </div>
                        <div>

                            <p>Client Name: <span>{geteventdata.ClientName}</span></p>
                            <p>Event End Date: <span>{geteventdata.EventEndDate}</span></p>
                            <p>No Of Participants: <span>{geteventdata.NoOfParticipants}</span></p>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default ViewEvent
